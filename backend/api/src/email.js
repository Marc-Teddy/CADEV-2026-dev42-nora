import nodemailer from 'nodemailer';

export class EmailProviderNotConfiguredError extends Error {
  constructor() {
    super('Email delivery is not configured');
    this.code = 'EMAIL_PROVIDER_NOT_CONFIGURED';
  }
}

export function createEmailSender(config) {
  if (!config.smtpHost || !config.smtpPort || !config.smtpFrom) {
    return {
      async sendVerification() {
        throw new EmailProviderNotConfiguredError();
      }
    };
  }

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: config.smtpUser ? { user: config.smtpUser, pass: config.smtpPassword } : undefined
  });

  return {
    async sendVerification({ email, token }) {
      const url = `${config.emailVerificationUrl}?token=${encodeURIComponent(token)}`;
      await transporter.sendMail({
        from: config.smtpFrom,
        to: email,
        subject: 'Confirmez votre adresse e-mail NORA',
        text: `Confirmez votre compte NORA en ouvrant ce lien : ${url}\n\nCe lien expire dans ${config.emailVerificationTtl}.`,
        html: `<p>Confirmez votre compte NORA en cliquant sur ce lien :</p><p><a href="${url}">Confirmer mon adresse e-mail</a></p><p>Ce lien expire dans ${config.emailVerificationTtl}.</p>`
      });
    }
  };
}
