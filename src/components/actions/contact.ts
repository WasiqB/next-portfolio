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

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmailAction(values: z.infer<typeof contactSchema>) {
  try {
    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      return { error: 'Invalid form data', fieldErrors: parsed.error.flatten().fieldErrors };
    }

    const { name, email, reason, message, toEmail } = parsed.data;

    await resend.emails.send({
      from: 'User Inquiry <noreply@wasiqbhamla.com>',
      to: toEmail,
      subject: `User Inquiry: ${reason || 'General Inquiry'}`,
      react: ContactEmail({
        name,
        email: email.toLowerCase(),
        reason,
        message,
      }),
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { error: 'Failed to send message. Please try again later.' };
  }
}
