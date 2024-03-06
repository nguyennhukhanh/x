import { Module } from '@nestjs/common';

import { TelegramModule } from '../telegram/telegram.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [TelegramModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
