import { Module } from '@nestjs/common';

import { BotModule } from '../bot/bot.module';
import { TelegramService } from './telegram.service';

@Module({
  imports: [BotModule],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
