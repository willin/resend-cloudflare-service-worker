import { Resend } from 'resend';

export type SendEmailProps = {
  to: string | string[];
  subject: string;
  html: string;
};

export interface EmailProvider {
  sendEmail(props: SendEmailProps);
}

export class EmailService implements EmailProvider {
  #resend: Resend;
  #EMAIL_USERNAME: string;

  constructor(key: string, emailUsername: string) {
    this.#resend = new Resend(key);
    this.#EMAIL_USERNAME = emailUsername;
  }

  async sendEmail({ to, subject, html }: SendEmailProps) {
    try {
      const { error } = await this.#resend.emails.send({
        from: this.#EMAIL_USERNAME,
        to: Array.isArray(to) ? to : [to],
        subject,
        html
      });

      if (error) {
        console.error(error);
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
