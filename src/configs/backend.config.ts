import { registerAs } from '@nestjs/config';

export default registerAs('backend', () => ({
  backendUrl: process.env.BACKEND_URL,
  backendPort: Number(process.env.BACKEND_PORT),
}));
