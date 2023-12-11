import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('telegram')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    return await this.webhookService.handleWebhook(req, res);
  }
}
