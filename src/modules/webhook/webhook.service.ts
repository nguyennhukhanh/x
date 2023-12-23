import { Injectable, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { Update } from 'node-telegram-bot-api';

import { TelegramService } from '../telegram/telegram.service';

const logger = new Logger('WebhookTelegram');

@Injectable()
export class WebhookService {
  constructor(private readonly telegramService: TelegramService) {}

  async handleWebhook(req: Request, res: Response): Promise<void> {
    const update: Update = req.body;
    const message = update.message;

    if (message && message.new_chat_members) {
      this.telegramService.handleNewMemberJoined(message);
    } else if (update && update.message) {
      this.telegramService.handleAsk(message);
    } else if (message && message.left_chat_member) {
      this.telegramService.handleMemberLeft(message);
    } else if (message && message.entities[0].type == 'bot_command') {
      this.telegramService.handleStartCommand(message);
    } else {
      logger.warn(message);
    }

    res.sendStatus(200);
  }
}
