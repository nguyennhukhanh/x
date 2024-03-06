import { registerAs } from '@nestjs/config';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MainConfig {
  @IsNotEmpty()
  @IsString()
  backendUrl: string;

  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsNotEmpty()
  @IsBoolean()
  isProduction: boolean;

  @IsNotEmpty()
  @IsString()
  apiPrefix: string;

  constructor() {
    this.backendUrl = process.env.BACKEND_URL;
    this.port = Number(process.env.PORT) || 1410;
    this.isProduction = process.env.PRODUCTION === 'true';
    this.apiPrefix = 'api';
  }
}

export default registerAs('main', () => new MainConfig());
