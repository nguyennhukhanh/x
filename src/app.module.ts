import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BotModule } from './modules/bot/bot.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { DiscordModule } from './modules/discord/discord.module';
import { load } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load,
    }),
    BotModule,
    TelegramModule,
    DiscordModule,
  ],
})
export class AppModule {}
