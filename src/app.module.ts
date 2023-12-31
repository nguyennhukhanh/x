import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'out'),
    }),
    BotModule,
    TelegramModule,
    DiscordModule,
    WebhookModule,
  ],
})
export class AppModule {}
