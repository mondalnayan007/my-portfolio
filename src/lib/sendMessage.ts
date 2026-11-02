import emailjs from "@emailjs/browser";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/**
 * Client-side mail sending through EmailJS. No backend required.
 *
 * Required in .env.local (restart `npm run dev` after editing):
 *   NEXT_PUBLIC_EMAILJS_SERVICE_ID
 *   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
 *   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
 *
 * Variables available inside your EmailJS template:
 *   {{from_name}} {{from_email}} {{reply_to}} {{subject}} {{message}} {{to_name}} {{sent_at}}
 */

// NOTE: Next.js only inlines env vars when they are referenced literally like this.
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

/** Turns EmailJS' { status, text } rejection into a friendly message. */
function explain(err: unknown): string {
  if (err && typeof err === "object" && "status" in err) {
    const { status, text } = err as { status: number; text?: string };
    if (status === 400) return `EmailJS rejected the request: ${text || "check your Service ID and Template ID."}`;
    if (status === 401 || status === 403) return "EmailJS public key is invalid or this domain isn't allowed.";
    if (status === 404) return "EmailJS service or template was not found. Re-check the IDs in .env.local.";
    if (status === 412) return `EmailJS service error: ${text || "reconnect your email service in the dashboard."}`;
    if (status === 429) return "Too many messages sent. Please try again in a moment.";
    return text || `EmailJS error (${status}).`;
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong. Please try again or email me directly.";
}

export async function sendMessage(v: ContactPayload): Promise<void> {
  const missing = [
    !SERVICE_ID && "NEXT_PUBLIC_EMAILJS_SERVICE_ID",
    !TEMPLATE_ID && "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID",
    !PUBLIC_KEY && "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY",
  ].filter(Boolean);

  if (missing.length) {
    throw new Error(`EmailJS is not configured. Missing: ${missing.join(", ")}. Add them to .env.local and restart the dev server.`);
  }

  try {
    await emailjs.send(
      SERVICE_ID!,
      TEMPLATE_ID!,
      {
        from_name: v.name.trim(),
        from_email: v.email.trim(),
        reply_to: v.email.trim(),
        to_name: "Nayan Mondal",
        subject: v.subject || "New message from your portfolio",
        message: v.message.trim(),
        sent_at: new Date().toLocaleString(),
      },
      { publicKey: PUBLIC_KEY! }
    );
  } catch (err) {
    throw new Error(explain(err));
  }
}