import React, { useEffect, useRef } from 'react';

/**
 * ── TWEAKABLE CONFIG ─────────────────────────────────────────────────────
 * Everything you'd want to art-direct lives here. Colors are linear 0-1 RGB
 * triples (not hex) because they're fed straight into the shader as uniforms.
 */
const HERO_BG_CONFIG = {
  // near-black base, with the faintest green tint so it never reads as pure grey/black
  colorBackground: [0.018, 0.033, 0.028] as [number, number, number],
  // deep emerald the flow field sits in most of the time
  colorGreenDeep: [0.05, 0.22, 0.15] as [number, number, number],
  // bright emerald used sparingly, for the "light through darkness" highlights (~ brand-accent #22c55e)
  colorGreenBright: [0.13, 0.77, 0.37] as [number, number, number],

  speed: 0.045, // global animation speed multiplier — smaller = slower/calmer
  intensity: 1.0, // overall brightness of the flow highlights

  // detail level (fbm octaves) — lower on mobile to keep frame times cheap
  octavesDesktop: 5,
  octavesMobile: 3,

  // devicePixelRatio caps — the big lever for GPU cost on high-DPI phones
  dprCapDesktop: 2,
  dprCapMobile: 1.75,

  // extra internal-resolution downscale on mobile (canvas stays full CSS size,
  // just rendered at fewer physical pixels, then upscaled by the GPU for free)
  renderScaleMobile: 0.82,
  renderScaleDesktop: 1,

  mobileBreakpointPx: 1024,

  // Elements carrying this attribute mark the page regions meant to show the
  // background — used to decide when it's safe to pause the render loop.
  regionSelector: '[data-animated-bg-region]',
};

const VERTEX_SRC = `
  attribute vec2 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

// Fragment shader template — {{OCTAVES}} is swapped for an int before compiling,
// since GLSL ES 1.0 loop bounds must be compile-time constants.
const FRAGMENT_SRC_TEMPLATE = `
  precision highp float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uIntensity;
  uniform float uCompose; // 0 = wide/landscape composition, 1 = tall/portrait composition
  uniform vec3 uColorBg;
  uniform vec3 uColorDeep;
  uniform vec3 uColorBright;

  // ── Ashima/McEwan simplex noise (MIT) — compact 3D implementation ──
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amp = 0.5;
    for (int i = 0; i < {{OCTAVES}}; i++) {
      value += amp * snoise(p);
      p *= 2.02;
      amp *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;

    // Recompose the flow field's "anchor" depending on aspect ratio, so a tall
    // phone screen gets its own balanced arrangement rather than a crop of the
    // wide desktop one.
    vec2 anchor = mix(vec2(0.35, -0.1), vec2(0.0, -0.25), uCompose);
    vec2 pc = p - anchor;

    float t = uTime * uSpeed;

    vec3 q = vec3(pc * 0.75, t * 0.14);
    float n1 = fbm(q);

    vec3 warped = vec3(pc * 0.8 + n1 * 0.35, t * 0.1 + 4.2);
    float n2 = fbm(warped);

    float flow = n2 * 0.5 + 0.5; // remap to 0..1

    // Push most of the field toward the near-black base; green only surfaces
    // in a smaller, softer portion of the range so it reads as light drifting
    // through darkness rather than an all-over marbled texture.
    vec3 col = mix(uColorBg, uColorDeep, smoothstep(0.42, 0.82, flow));
    col = mix(col, uColorBright, smoothstep(0.74, 0.97, flow) * 0.4 * uIntensity);

    // soft vignette so edges/corners stay calm and text areas stay dark
    float vig = smoothstep(1.35, 0.1, length(pc * vec2(0.85, 1.0)));
    col *= mix(0.6, 1.0, vig);

    // faint lift near the top, echoing a studio spotlight
    float top = smoothstep(0.95, -0.5, uv.y);
    col += uColorDeep * top * 0.06;

    // dither to avoid gradient banding on dark tones
    float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
    col += dither;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

/**
 * Draws a single static frame on a plain 2D canvas — used both as the
 * `prefers-reduced-motion` fallback and as the safety net if WebGL is
 * unavailable on the device.
 */
function drawStaticFallback(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { width, height } = canvas;
  const [br, bg, bb] = HERO_BG_CONFIG.colorBackground;
  const [dr, dg, db] = HERO_BG_CONFIG.colorGreenDeep;
  ctx.fillStyle = `rgb(${br * 255}, ${bg * 255}, ${bb * 255})`;
  ctx.fillRect(0, 0, width, height);
  const grad = ctx.createRadialGradient(
    width * 0.62, height * 0.15, 0,
    width * 0.62, height * 0.15, Math.max(width, height) * 0.75
  );
  grad.addColorStop(0, `rgba(${dr * 255}, ${dg * 255}, ${db * 255}, 0.55)`);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}

const HeroBackground: React.FC<{ className?: string }> = ({ className = 'absolute inset-0 w-full h-full' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = prefersReducedMotion();
    const isMobile = window.innerWidth < HERO_BG_CONFIG.mobileBreakpointPx;

    const gl = (canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' }) ||
      canvas.getContext('experimental-webgl', { antialias: false, alpha: false })) as WebGLRenderingContext | null;

    // No WebGL available — paint the calm static fallback and stop.
    if (!gl) {
      const resize = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        drawStaticFallback(canvas);
      };
      resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }

    const octaves = isMobile ? HERO_BG_CONFIG.octavesMobile : HERO_BG_CONFIG.octavesDesktop;
    const fragSrc = FRAGMENT_SRC_TEMPLATE.replace('{{OCTAVES}}', String(octaves));

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('HeroBackground: shader link error', gl.getProgramInfoLog(program));
      drawStaticFallback(canvas);
      return;
    }
    gl.useProgram(program);

    // Fullscreen triangle (cheaper than a quad, no diagonal seam)
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uSpeed = gl.getUniformLocation(program, 'uSpeed');
    const uIntensity = gl.getUniformLocation(program, 'uIntensity');
    const uCompose = gl.getUniformLocation(program, 'uCompose');
    const uColorBg = gl.getUniformLocation(program, 'uColorBg');
    const uColorDeep = gl.getUniformLocation(program, 'uColorDeep');
    const uColorBright = gl.getUniformLocation(program, 'uColorBright');

    gl.uniform3fv(uColorBg, HERO_BG_CONFIG.colorBackground);
    gl.uniform3fv(uColorDeep, HERO_BG_CONFIG.colorGreenDeep);
    gl.uniform3fv(uColorBright, HERO_BG_CONFIG.colorGreenBright);
    gl.uniform1f(uSpeed, HERO_BG_CONFIG.speed);
    gl.uniform1f(uIntensity, HERO_BG_CONFIG.intensity);

    let rafId = 0;
    let running = false;
    let startTime = performance.now();

    const resize = () => {
      const mobileNow = window.innerWidth < HERO_BG_CONFIG.mobileBreakpointPx;
      const dprCap = mobileNow ? HERO_BG_CONFIG.dprCapMobile : HERO_BG_CONFIG.dprCapDesktop;
      const renderScale = mobileNow ? HERO_BG_CONFIG.renderScaleMobile : HERO_BG_CONFIG.renderScaleDesktop;
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap) * renderScale;

      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uResolution, w, h);
      gl.uniform1f(uCompose, canvas.clientHeight > canvas.clientWidth ? 1 : 0);
    };

    const renderFrame = (time: number) => {
      gl.uniform1f(uTime, (time - startTime) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (time: number) => {
      renderFrame(time);
      if (running) rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
    };

    resize();

    if (reduced) {
      // Render one calm, fixed frame and never animate again.
      renderFrame(startTime + 12000);
    } else {
      start();
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduced) renderFrame(startTime + 12000);
    });
    resizeObserver.observe(canvas);

    // The canvas is a fixed, full-viewport backdrop shared by several page
    // sections (it's always "in view" itself), so instead of observing the
    // canvas we watch the actual content regions that are meant to show it —
    // pausing only once every one of them has scrolled out of view (e.g. the
    // user is over a light/opaque section, or past the tagged content entirely).
    const regions = document.querySelectorAll(HERO_BG_CONFIG.regionSelector);
    const observeTargets = regions.length > 0 ? regions : [canvas];
    let visibleCount = 0;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (reduced) return;
        for (const entry of entries) {
          visibleCount += entry.isIntersecting ? 1 : -1;
        }
        if (visibleCount > 0) start();
        else stop();
      },
      { threshold: 0 }
    );
    observeTargets.forEach((el) => intersectionObserver.observe(el));

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      // Note: we deliberately do NOT force-lose the WebGL context here.
      // Doing so breaks React StrictMode's dev-only mount→cleanup→mount cycle
      // (the second mount can't get a fresh context on the same canvas).
      // The browser reclaims the context normally once the canvas is unmounted.
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ backgroundColor: '#050b08' }}
    />
  );
};

export default HeroBackground;
