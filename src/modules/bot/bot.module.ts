import { Module } from '@nestjs/common';

import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { TextToImageService } from './text-to-image.service';

@Module({
  providers: [BotService, TextToImageService],
  controllers: [BotController],
  exports: [BotService, TextToImageService],
})
export class BotModule {}
