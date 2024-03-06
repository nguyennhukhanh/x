import type { GenerativeModel } from '@google/generative-ai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getLogger } from 'src/utils/logger';

const logger = getLogger('Gemini');

@Injectable()
export class GeminiService {
  private geminiKey: string;
  private model: string;

  private genAI: GoogleGenerativeAI;
  private bot: GenerativeModel;
  constructor(private configService: ConfigService) {
    this._init();
  }

  _init(): void {
    this.geminiKey = this.configService.get('gemini.privateKey');
    this.model = this.configService.get('gemini.model');

    this.genAI = new GoogleGenerativeAI(this.geminiKey);
    this.bot = this.genAI.getGenerativeModel({ model: this.model });

    logger.info('Gemini is ready!');
  }

  async ask(question: string): Promise<string> {
    const result = await this.bot.generateContent(question);
    const response = result.response;
    const text = response.text();

    return text;
  }
}
