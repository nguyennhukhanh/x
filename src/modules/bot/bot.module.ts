import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';

import { GeminiService } from './gemini.service';
import { TextToImageService } from './text-to-image.service';

@Module({
  imports: [ServicesModule],
  providers: [TextToImageService, GeminiService],
  controllers: [],
  exports: [TextToImageService, GeminiService],
})
export class BotModule {}
