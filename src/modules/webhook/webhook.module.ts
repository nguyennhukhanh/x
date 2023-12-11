import { Module } from '@nestjs/common';

import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';

import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [TelegramModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
