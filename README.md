# Resend Cloudflare Worker Service

[中文版](./README.zh-cn.md) / [English](./README.md)

## Prepare

1. `Use this template` to fork this repository to create your project
2. Set `Actions Secrets` in the project `Settings`, add the following environment variables:

```bash
### Only For Github Actions
CLOUDFLARE_ACCOUNT_ID="xxx"
CLOUDFLARE_API_TOKEN="xxx"

### Resend mail sending service, you can register for free sending
RESEND_API_KEY="re_xxxx"
### The username of the email sent
EMAIL_USERNAME="No-Reply <no-reply@system.example.com>"
### Address to receive test emails
TEST_EMAIL_ADDRESS="your@email.com"
```

## Use in Worker / Pages

Modify the `wrangler.toml` configuration in the project, add:

```toml
[[services]]
binding = "RESEND"
service = "email-sender-worker"
```

Then use in the code:

```ts
await ctx.env.RESEND.sendEmail({
  to: ['address@example.com'], // or just a string
  subject: 'Hello, World!',
  html: '<h1>Hello, World!</h1>'
}); // returns b
```

Where the parameter of `sendEmail` is of type `SendEmailOptions`:

```ts
type SendEmailProps = {
  to: string | string[];
  subject: string;
  html: string;
};
```

## Local Development

```bash
# npm, yarn, or pnpm
bun install
bun run dev
```

Then visit <http://localhost:8787>, a test email will be sent to `TEST_EMAIL_ADDRESS` mailbox.

## Sponsor

Donation ways:

- Github: <https://github.com/sponsors/willin> [![github](https://img.shields.io/github/followers/willin.svg?style=social&label=Followers)](https://github.com/willin)
- Alipay or Wechat Pay: [QRCode](https://user-images.githubusercontent.com/1890238/89126156-0f3eeb80-d516-11ea-9046-5a3a5d59b86b.png)
- ETH: `0x6D877f96198E55085CEb56097B099cc7bb814263`

## License

MIT
