export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
}

export interface Step {
  title: string;
  description: string;
  icon: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}
