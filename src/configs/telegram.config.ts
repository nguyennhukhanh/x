import { registerAs } from '@nestjs/config';

export default registerAs('telegram', () => ({
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  telegramBotMessage: process.env.TELEGRAM_BOT_MESSAGE,
}));
