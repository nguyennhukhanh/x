import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ExceptionFilter } from './common/exception/exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { load } from './configs';
import { BotModule } from './modules/bot/bot.module';
import { DiscordModule } from './modules/discord/discord.module';

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
    // TelegramModule,
    DiscordModule,
    // WebhookModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule {}
