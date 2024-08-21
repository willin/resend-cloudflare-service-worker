# Resend Cloudflare Worker Service

[中文版](./README.zh-cn.md) / [English](./README.md)

## 准备工作

1. `Use this template` 活 Fork 这个仓库来创建你的项目
2. 在项目 `Settings` 里设置 `Actions Secrets`，添加如下环境变量：

```bash
### 仅用于 Github Actions
CLOUDFLARE_ACCOUNT_ID="xxx"
CLOUDFLARE_API_TOKEN="xxx"

### Resend 邮件发送服务，可自行注册免费发送
RESEND_API_KEY="re_xxxx"
### 发送邮件的用户名
EMAIL_USERNAME="No-Reply <no-reply@system.example.com>"
### 发送测试邮件接收的地址
TEST_EMAIL_ADDRESS="your@email.com"
```

## Worker / Pages 中使用

在项目工程中修改 `wrangler.toml` 配置，添加：

```toml
[[services]]
binding = "RESEND"
service = "email-sender-worker"
```

然后在代码中使用：

```ts
await ctx.env.RESEND.sendEmail({
  // 或者不用数组，直接一个邮箱字符串
  to: ['address@example.com'],
  subject: 'Hello, World!',
  html: '<h1>Hello, World!</h1>'
}); // 返回值类型为 boolean
```

其中 `sendEmail` 的参数为 `SendEmailOptions` 类型：

```ts
type SendEmailProps = {
  to: string | string[];
  subject: string;
  html: string;
};
```

## 本地开发测试

```bash
# 使用 npm、yarn 或者 pnpm 也可以
bun install
bun run dev
```

然后访问 <http://localhost:8787> ，会给 `TEST_EMAIL_ADDRESS` 邮箱发送一封测试邮件。

## 赞助

如果您对本项目感兴趣，可以通过以下方式支持我：

- 关注我的 Github 账号：[@willin](https://github.com/willin) [![github](https://img.shields.io/github/followers/willin.svg?style=social&label=Followers)](https://github.com/willin)
- 参与 [爱发电](https://afdian.net/@willin) 计划
- 支付宝或微信[扫码打赏](https://user-images.githubusercontent.com/1890238/89126156-0f3eeb80-d516-11ea-9046-5a3a5d59b86b.png)
- ETH: `0x6D877f96198E55085CEb56097B099cc7bb814263`

## 许可证

MIT
