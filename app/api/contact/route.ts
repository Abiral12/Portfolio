import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";


export const runtime = "nodejs";

const bodySchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  botField: z.string().optional(), // honeypot
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { name, email, message, botField } = parsed.data;

    // simple honeypot: if filled, likely a bot
    if (botField && botField.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";
    if (!to) {
      return NextResponse.json({ error: "CONTACT_TO not set" }, { status: 500 });
    }

    // send email
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui">
          <h2>New message from your portfolio</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <hr/>
          <p>${escapeHtml(message).replace(/\\n/g, "<br/>")}</p>
        </div>
      `,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Email failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
