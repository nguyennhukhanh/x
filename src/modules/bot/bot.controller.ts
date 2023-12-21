import { Controller, Post, Body } from '@nestjs/common';

import { GPTService } from './gpt.service';

@Controller('bot')
export class BotController {
  constructor(private readonly gptService: GPTService) {}

  @Post('ask')
  async ask(@Body('question') question: string): Promise<string> {
    return await this.gptService.ask(question);
  }
}
