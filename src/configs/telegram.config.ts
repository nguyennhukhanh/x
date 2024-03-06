import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';

export class TelegramConfig {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  constructor() {
    this.token = process.env.TELEGRAM_BOT_TOKEN;
    this.message = process.env.TELEGRAM_BOT_MESSAGE;
  }
}

export default registerAs('telegram', () => new TelegramConfig());
