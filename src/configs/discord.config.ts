import { registerAs } from '@nestjs/config';

export default registerAs('discord', () => ({
  discordClientSecret: process.env.DISCORD_CLIENT_SECRET,
  discordBotMessage: process.env.DISCORD_BOT_MESSAGE,
}));
