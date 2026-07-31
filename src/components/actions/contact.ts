'use server';

import { z } from 'zod';
import { domain } from '@/lib/constants';

const contactSchema = z.object({
  toEmail: z.email(),
  name: z.string().min(2).max(100),
  email: z.email(),
  reason: z.string().min(2),
  message: z.string().min(10).max(2000),
});

export async function sendContactEmailAction(values: z.infer<typeof contactSchema>) {
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    return { error: 'Invalid form data', fieldErrors: z.treeifyError(parsed.error) };
  }

  const { name, email, reason, message, toEmail } = parsed.data;

  try {
    const response = await fetch(`${domain}/api/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: toEmail,
        subject: `User Inquiry: ${reason || 'General Inquiry'}`,
        message,
        name,
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Failed to send email' };
    }

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: 'Network error. Please try again.' };
  }
}
