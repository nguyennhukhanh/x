import { Module } from '@nestjs/common';

import { FirebaseStorageService } from './firebase_storage.service';

@Module({
  providers: [FirebaseStorageService],
  exports: [FirebaseStorageService],
})
export class ServicesModule {}
