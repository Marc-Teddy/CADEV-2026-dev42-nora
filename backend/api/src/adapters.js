import crypto from 'node:crypto';

export class ProviderNotConfiguredError extends Error {
  constructor(provider) {
    super(`Provider "${provider}" is not configured`);
    this.code = 'PROVIDER_NOT_CONFIGURED';
  }
}

export class PaymentProvider {
  constructor(name, config = {}) { this.name = name; this.config = config; }
  async createCheckout() { throw new ProviderNotConfiguredError(this.name); }
  verifyWebhook() { throw new ProviderNotConfiguredError(this.name); }
}

export class MockPaymentProvider extends PaymentProvider {
  async createCheckout({ paymentIntentId, amountMinor, currency }) {
    return { provider: this.name, reference: `mock_${paymentIntentId}`, checkoutUrl: `/mock-payments/${paymentIntentId}`, amountMinor, currency, mode: 'mock' };
  }
  verifyWebhook(rawBody, signature, secret) {
    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    const actual = Buffer.from(signature ?? '');
    const expectedBuffer = Buffer.from(expected);
    return actual.length === expectedBuffer.length && crypto.timingSafeEqual(actual, expectedBuffer);
  }
}

export class AiProvider {
  constructor(name, config = {}) { this.name = name; this.config = config; }
  async complete() { throw new ProviderNotConfiguredError(this.name); }
  async moderate() { throw new ProviderNotConfiguredError(this.name); }
  async transcribe() { throw new ProviderNotConfiguredError(this.name); }
  async translate() { throw new ProviderNotConfiguredError(this.name); }
}

export class MockAiProvider extends AiProvider {
  async complete({ prompt }) { return { provider: this.name, text: `Mock completion for ${prompt.slice(0, 200)}`, mode: 'mock' }; }
  async moderate() { return { provider: this.name, action: 'review', confidence: 0, reason: 'Mock provider requires human review' }; }
  async transcribe() { return { provider: this.name, text: '', mode: 'mock' }; }
  async translate({ text, target }) { return { provider: this.name, text, target, mode: 'mock' }; }
}

export function createProviderRegistry(config) {
  const payment = new Map();
  for (const name of ['card', 'mtn_momo', 'celtiis', 'wave', 'orange_money', 'moov_money']) {
    payment.set(name, new MockPaymentProvider(name, config));
  }
  return { payment, ai: new MockAiProvider('mock-ai', config) };
}
