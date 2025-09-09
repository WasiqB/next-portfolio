import { Resend } from "resend";

const ReSend = new Resend(process.env.RESEND_API_KEY);

export default ReSend;
