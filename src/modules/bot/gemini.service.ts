import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

const logger = new Logger('Gemini');

@Injectable()
export class GeminiService {
  private geminiKey: string;
  private geminiModel: string;

  private genAI: GoogleGenerativeAI;
  private bot: GenerativeModel;
  constructor(private configService: ConfigService) {
    this._init();
  }

  _init(): void {
    this.geminiKey = this.configService.get('gemini.geminiPrivateKey');
    this.geminiModel = this.configService.get('gemini.geminiModel');

    this.genAI = new GoogleGenerativeAI(this.geminiKey);
    this.bot = this.genAI.getGenerativeModel({ model: this.geminiModel });

    logger.log('Gemini is ready!');
  }

  async ask(question: string): Promise<string> {
    const result = await this.bot.generateContent(question);
    const response = result.response;
    const text = response.text();

    return text;
  }
}
