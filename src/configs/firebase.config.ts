import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';
import * as admin from 'firebase-admin';

export class FirebaseConfig {
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  clientEmail: string;

  @IsNotEmpty()
  @IsString()
  privateKey: string;

  @IsNotEmpty()
  @IsString()
  storageBucket: string;

  credential: any;

  constructor() {
    this.projectId = process.env.PROJECT_ID;
    this.clientEmail = process.env.CLIENT_EMAIL;
    this.privateKey = process.env.PRIVATE_KEY;
    this.storageBucket = process.env.BUCKET_NAME;

    this.credential = admin.credential.cert({
      projectId: this.projectId,
      clientEmail: this.clientEmail,
      privateKey: this.privateKey.replace(/\\n/gm, '\n') ?? undefined,
    });
  }
}

export default registerAs('firebase', () => new FirebaseConfig());
