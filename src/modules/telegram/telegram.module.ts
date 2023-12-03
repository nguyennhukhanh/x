import { Module } from '@nestjs/common';

import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';

import { BotModule } from '../bot/bot.module';

@Module({
  imports: [BotModule],
  providers: [TelegramService],
  controllers: [TelegramController],
})
export class TelegramModule {}
