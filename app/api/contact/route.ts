import { NextResponse } from "next/server";

import { projectTypes } from "../../contact-options";

type ContactPayload = {
  name: string;
  email: string;
  type: string;
  message: string;
  company: string;
};

const resendEndpoint = "https://api.resend.com/emails";
const maxFieldLength = 2_000;

function getStringField(
  body: Record<string, unknown>,
  field: keyof ContactPayload,
) {
  const value = body[field];
  return typeof value === "string" ? value.trim().slice(0, maxFieldLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeRecipients(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function buildEmailHtml(payload: ContactPayload) {
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeType = escapeHtml(payload.type);
  const safeMessage = escapeHtml(payload.message || "Bez správy.");

  return `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.5;">
      <p style="margin: 0 0 16px;"><strong>Nový kontakt z formulára Tap-it</strong></p>
      <p style="margin: 0 0 8px;"><strong>Meno:</strong> ${safeName}</p>
      <p style="margin: 0 0 8px;"><strong>E-mail:</strong> ${safeEmail}</p>
      <p style="margin: 0 0 16px;"><strong>Typ záujmu:</strong> ${safeType}</p>
      <p style="margin: 0 0 8px;"><strong>Správa:</strong></p>
      <p style="margin: 0; white-space: pre-line;">${safeMessage}</p>
    </div>
  `;
}

function buildEmailText(payload: ContactPayload) {
  return [
    "Nový kontakt z formulára Tap-it",
    "",
    `Typ záujmu: ${payload.type}`,
    `Meno: ${payload.name}`,
    `E-mail: ${payload.email}`,
    "",
    "Správa:",
    payload.message || "Bez správy.",
  ].join("\n");
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const recipients = normalizeRecipients(process.env.CONTACT_TO_EMAIL);

  if (!resendApiKey || !from || recipients.length === 0) {
    return NextResponse.json(
      { message: "Formulár ešte nie je nakonfigurovaný na odosielanie." },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Neplatný formát formulára." },
      { status: 400 },
    );
  }

  const payload: ContactPayload = {
    name: getStringField(body, "name"),
    email: getStringField(body, "email").toLowerCase(),
    type: getStringField(body, "type"),
    message: getStringField(body, "message"),
    company: getStringField(body, "company"),
  };

  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const allowedTypes = new Set<string>(projectTypes);

  if (
    payload.name.length < 2 ||
    !emailPattern.test(payload.email) ||
    !allowedTypes.has(payload.type)
  ) {
    return NextResponse.json(
      { message: "Skontroluj meno, e-mail a typ záujmu." },
      { status: 400 },
    );
  }

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: recipients,
      reply_to: payload.email,
      subject: "Nový kontakt z formulára Tap-it",
      html: buildEmailHtml(payload),
      text: buildEmailText(payload),
      headers: {
        "Auto-Submitted": "auto-generated",
        "X-Auto-Response-Suppress": "All",
        "X-Entity-Ref-ID": `tap-it-contact-${Date.now()}`,
      },
      tags: [
        {
          name: "source",
          value: "tap_it_web",
        },
        {
          name: "form",
          value: "contact",
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    console.error("Resend contact form error", error ?? response.statusText);

    return NextResponse.json(
      { message: "Mail sa nepodarilo odoslať. Skús to prosím znova." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
