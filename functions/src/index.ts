import { onRequest } from "firebase-functions/v2/https";
import { defineSecret, defineString } from "firebase-functions/params";
import { Resend } from "resend";

const resendApiKey = defineSecret("RESEND_API_KEY");
const resendFrom = defineString("RESEND_FROM_EMAIL", {
  default: "Caira <noreply@caira.care>",
});
const pilotEmail = defineString("PILOT_EMAIL", {
  default: "info@caira.care",
});

const allowedOrigins = [
  "https://caira.care",
  "https://www.caira.care",
  "https://caira-care-eaf48.web.app",
  "http://localhost:4321",
  "http://127.0.0.1:4321",
];

interface PilotPayload {
  name?: string;
  email?: string;
  centerName?: string;
  location?: string;
  classrooms?: string;
  message?: string;
}

function setCors(
  req: { get: (name: string) => string | undefined },
  res: { set: (key: string, value: string) => void }
) {
  const origin = req.get("Origin") || req.get("origin") || "";
  if (allowedOrigins.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
  }
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const pilotRequest = onRequest(
  {
    secrets: [resendApiKey],
    region: "us-central1",
    maxInstances: 10,
    invoker: "public",
  },
  async (req, res) => {
    setCors(req, res);

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const body = (req.body || {}) as PilotPayload;
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const centerName = (body.centerName || "").trim();
    const location = (body.location || "").trim();
    const classrooms = (body.classrooms || "").trim();
    const message = (body.message || "").trim();

    if (!name || !email || !centerName) {
      res.status(400).json({ error: "Name, email, and center name are required." });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ error: "Invalid email address." });
      return;
    }

    if (message.length > 5000) {
      res.status(400).json({ error: "Message is too long." });
      return;
    }

    const resend = new Resend(resendApiKey.value());
    const to = pilotEmail.value();
    const from = resendFrom.value();
    const subject = `Pilot inquiry — ${centerName}`;

    const html = `
      <h2>New Caira pilot inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Center:</strong> ${escapeHtml(centerName)}</p>
      <p><strong>Location:</strong> ${escapeHtml(location || "Not provided")}</p>
      <p><strong>Classrooms:</strong> ${escapeHtml(classrooms || "Not provided")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message || "No message provided.").replace(/\n/g, "<br />")}</p>
      <hr />
      <p style="color:#666;font-size:12px;">Submitted from caira.care marketing site.</p>
    `;

    const text = [
      "New Caira pilot inquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Center: ${centerName}`,
      `Location: ${location || "Not provided"}`,
      `Classrooms: ${classrooms || "Not provided"}`,
      "",
      "Message:",
      message || "No message provided.",
    ].join("\n");

    try {
      const result = await resend.emails.send({
        from,
        to: [to],
        replyTo: email,
        subject,
        html,
        text,
      });

      if (result.error) {
        console.error("Resend error:", result.error);
        res.status(502).json({ error: "Failed to send email." });
        return;
      }

      res.status(200).json({ ok: true });
    } catch (error) {
      console.error("Pilot request failed:", error);
      res.status(500).json({ error: "Failed to send email." });
    }
  }
);
