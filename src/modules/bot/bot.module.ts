import { Module } from '@nestjs/common';

import { GPTService } from './gpt.service';
import { BotController } from './bot.controller';
import { TextToImageService } from './text-to-image.service';
import { GeminiService } from './gemini.service';

@Module({
  providers: [GPTService, TextToImageService, GeminiService],
  controllers: [BotController],
  exports: [GPTService, TextToImageService, GeminiService],
})
export class BotModule {}
