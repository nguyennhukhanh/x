import { registerAs } from '@nestjs/config';

export default registerAs('gemini', () => ({
  geminiPrivateKey: process.env.GEMINI_PRIVATE_KEY,
  geminiModel: process.env.GEMINI_MODEL,
}));
