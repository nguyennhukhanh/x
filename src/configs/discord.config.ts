import { registerAs } from '@nestjs/config';

export default registerAs('discord', () => ({
  discordPrivateKey: process.env.DISCORD_PRIVATE_KEY,
}));
