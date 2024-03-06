import { registerAs } from '@nestjs/config';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DatabaseConfig {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  host: string;

  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  database: string;

  @IsNotEmpty()
  @IsBoolean()
  synchronize: boolean;

  @IsNotEmpty()
  @IsBoolean()
  logging: boolean;

  constructor() {
    this.type = process.env.DB_TYPE;
    this.host = process.env.DB_HOST;
    this.port = Number(process.env.DB_PORT) || 3306;
    this.username = process.env.DB_USERNAME;
    this.password = process.env.DB_PASSWORD;
    this.database = process.env.DB_DATABASE;
    this.synchronize = process.env.DB_SYNCHRONIZE === 'true';
    this.logging = process.env.DB_LOGGING === 'true';
  }
}

export default registerAs('database', () => new DatabaseConfig());
