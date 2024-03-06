import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';

export class GeminiConfig {
  @IsNotEmpty()
  @IsString()
  privateKey: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  constructor() {
    this.privateKey = process.env.GEMINI_PRIVATE_KEY;
    this.model = process.env.GEMINI_MODEL;
  }
}

export default registerAs('gemini', () => new GeminiConfig());
