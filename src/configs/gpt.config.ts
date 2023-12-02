import { registerAs } from '@nestjs/config';

export default registerAs('gpt', () => ({
  gptPrivateKey: process.env.GPT_PRIVATE_KEY,
  gptModel: process.env.GPT_MODEL,
}));
