import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set');
}

const ReSend = new Resend(process.env.RESEND_API_KEY);

export default ReSend;
