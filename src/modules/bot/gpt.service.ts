import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

const logger = new Logger('GPT');

@Injectable()
export class GPTService {
  private bot: OpenAI;
  private gptKey: string;
  private gptModel: string;

  constructor(private configService: ConfigService) {
    this._init();
  }

  _init(): void {
    this.gptKey = this.configService.get('gpt.gptPrivateKey');
    this.gptModel = this.configService.get('gpt.gptModel');
    this.bot = new OpenAI({
      apiKey: this.gptKey,
    });

    logger.log('GPT is ready!');
  }

  async ask(question: string): Promise<string> {
    try {
      const completion = await this.bot.chat.completions.create({
        messages: [{ role: 'user', content: question }],
        model: this.gptModel,
        max_tokens: 4000,
        n: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.5,
        temperature: 0,
      });

      const text = completion.choices[0].message.content;
      return text;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
