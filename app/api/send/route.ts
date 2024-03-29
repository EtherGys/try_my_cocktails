import EmailTemplate  from '../../../emails/emailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['victoria.gyselynck.pro@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate(),
      text: "plop"
    });
console.log(data);

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
