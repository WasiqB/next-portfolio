import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { Data as portfolioData } from '@/data/portfolio-data';
import { ContactEmail } from '@/emails/ContactEmail';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  reason: z.string().min(2),
  message: z.string().min(10).max(2000),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: z.treeifyError(parsed.error) }, { status: 400 });
    }

    const { name, email, reason, message } = parsed.data;
    let reasonName = portfolioData.contact.reasons.find((r) => r.value === reason)?.name || 'Other';
    reasonName = reasonName === 'Other' ? 'General Inquiry' : reasonName;

    await resend.emails.send({
      from: 'User Inquiry <noreply@wasiqbhamla.com>',
      to: portfolioData.contact.email,
      subject: `User Inquiry: ${reasonName || 'General Inquiry'}`,
      replyTo: email,
      react: ContactEmail({
        name,
        email,
        reason: reasonName,
        message,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (_error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
