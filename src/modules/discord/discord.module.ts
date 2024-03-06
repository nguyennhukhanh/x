import { Module } from '@nestjs/common';

import { BotModule } from '../bot/bot.module';
import { DiscordService } from './discord.service';

@Module({
  imports: [BotModule],
  providers: [DiscordService],
})
export class DiscordModule {}
