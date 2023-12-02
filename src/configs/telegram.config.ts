import { registerAs } from '@nestjs/config';

export default registerAs('telegram', () => ({
  telegramPrivateKey: process.env.TELEGRAM_PRIVATE_KEY,
}));
