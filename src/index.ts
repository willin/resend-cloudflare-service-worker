import { WorkerEntrypoint } from 'cloudflare:workers';
import { EmailService, type SendEmailProps } from './services/email';
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default class extends WorkerEntrypoint<Env> {
  async fetch() {
    await this.sendEmail({ to: this.env.TEST_EMAIL_ADDRESS, subject: 'Hello', html: '<h1>Hello</h1>' });
    return new Response('');
  }
  sendEmail(props: SendEmailProps) {
    const emailService = new EmailService(this.env.RESEND_API_KEY, this.env.EMAIL_USERNAME);
    return emailService.sendEmail(props);
  }
}
