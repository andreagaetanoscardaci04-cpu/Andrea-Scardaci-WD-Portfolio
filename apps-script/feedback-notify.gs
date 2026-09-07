// Reference copy — the code that actually runs lives in the Google Apps Script
// project you create at script.google.com. Paste this in there, it is not
// executed by the site itself. See setup steps from Claude for how to deploy it.

const RECIPIENT_EMAIL = 'andreagaetanoscardaci04@gmail.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const body = Object.entries(data)
      .map(([key, value]) => `${key}: ${value || '—'}`)
      .join('\n');

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: `Nuovo feedback cliente — ${data['Nome attività'] || 'attività non specificata'}`,
      body,
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
