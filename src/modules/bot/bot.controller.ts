import { Controller, Post, Body } from '@nestjs/common';

import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post('ask')
  async ask(@Body('question') question: string): Promise<string> {
    return await this.botService.ask(question);
  }
}
