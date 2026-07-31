import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmail } from '@/emails/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, message, name, email } = body;

    // Validate required fields
    if (!to) {
      return NextResponse.json({ error: 'Missing required fields: To' }, { status: 400 });
    }

    if (!subject) {
      return NextResponse.json({ error: 'Missing required fields: Subject' }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: 'Missing required fields: Message' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'User Inquiry <noreply@wasiqbhamla.com>',
      to: [to],
      subject,
      react: ContactEmail({ name, email, reason: subject, message }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
