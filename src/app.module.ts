import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { load } from './configs';
import { BotModule } from './modules/bot/bot.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { DiscordModule } from './modules/discord/discord.module';
import { WebhookModule } from './modules/webhook/webhook.module';

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
    WebhookModule,
  ],
})
export class AppModule {}
