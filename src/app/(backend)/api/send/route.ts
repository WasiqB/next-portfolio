import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmail } from '@/emails/ContactEmail';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable');
  }

  return new Resend(apiKey);
}

function getFromAddress() {
  return process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, message, name, email } = body;

    if (!to) {
      return NextResponse.json({ error: 'Missing required fields: To' }, { status: 400 });
    }

    if (!subject) {
      return NextResponse.json({ error: 'Missing required fields: Subject' }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: 'Missing required fields: Message' }, { status: 400 });
    }

    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: `User Inquiry <${getFromAddress()}>`,
      to: [to],
      subject,
      react: ContactEmail({ name, email, reason: subject, message }),
    });

    if (error) {
      return NextResponse.json({ error: error.message || 'Resend rejected the request' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Contact email route failed:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
