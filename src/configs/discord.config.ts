import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';

export class DiscordConfig {
  @IsNotEmpty()
  @IsString()
  clientSecret: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  constructor() {
    this.clientSecret = process.env.DISCORD_CLIENT_SECRET;
    this.message = process.env.DISCORD_BOT_MESSAGE;
  }
}

export default registerAs('discord', () => new DiscordConfig());
