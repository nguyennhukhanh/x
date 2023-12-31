import { Module } from '@nestjs/common';

import { TelegramService } from './telegram.service';

import { BotModule } from '../bot/bot.module';

@Module({
  imports: [BotModule],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
