import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';

export class PainterConfig {
  @IsNotEmpty()
  @IsString()
  engineId: string;

  @IsNotEmpty()
  @IsString()
  apiHost: string;

  @IsNotEmpty()
  @IsString()
  apiKey: string;

  constructor() {
    this.engineId = process.env.ENGINE_ID;
    this.apiHost = process.env.API_HOST;
    this.apiKey = process.env.STABILITY_API_KEY;
  }
}

export default registerAs('painter', () => new PainterConfig());
