import { registerAs } from '@nestjs/config';

export default registerAs('painter', () => ({
  painterEngineId: process.env.ENGINE_ID,
  painterApiHost: process.env.API_HOST,
  painterApiKey: process.env.STABILITY_API_KEY,
}));
