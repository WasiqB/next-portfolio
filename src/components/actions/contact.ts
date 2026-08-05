'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { ContactEmail } from '@/emails/ContactEmail';

const contactSchema = z.object({
  toEmail: z.email(),
  name: z.string().min(2).max(100),
  email: z.email(),
  reason: z.string().min(2),
  message: z.string().min(10).max(2000),
});

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

export async function sendContactEmailAction(values: z.infer<typeof contactSchema>) {
  try {
    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      return { error: 'Invalid form data', fieldErrors: z.treeifyError(parsed.error) };
    }

    const { name, email, reason, message, toEmail } = parsed.data;
    const resend = getResendClient();
    const response = await resend.emails.send({
      from: `User Inquiry <${getFromAddress()}>`,
      to: [toEmail],
      subject: `User Inquiry: ${reason || 'General Inquiry'}`,
      react: ContactEmail({
        name,
        email: email.toLowerCase(),
        reason,
        message,
      }),
    });

    if (response.error) {
      throw new Error(response.error.message || 'Resend rejected the email request');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { error: 'Failed to send message. Please try again later.' };
  }
}
