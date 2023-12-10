import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';

import { GenerationResponse } from '../../utils/interfaces/generation-response.interface';
import generateRandomString from '../../common/functions/helper';

const logger = new Logger('PainterBot');

@Injectable()
export class TextToImageService {
  private engineId: string;
  private apiHost: string;
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.engineId = this.configService.get('painter.painterEngineId');
    this.apiHost = this.configService.get('painter.painterApiHost');
    this.apiKey = this.configService.get('painter.painterApiKey');
  }

  async ask(
    question: string,
  ): Promise<{ imageName: string; imagePath: string }> {
    try {
      if (!this.apiKey) throw new Error('Missing API key.');

      const response = await fetch(
        `${this.apiHost}/v1/generation/${this.engineId}/text-to-image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            text_prompts: [
              {
                text: question,
              },
            ],
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            steps: 30,
            samples: 1,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`);
      }

      const responseJSON = (await response.json()) as GenerationResponse;
      let imagePath = '';
      let imageName = '';

      const writePromises = responseJSON.artifacts.map(async (image, index) => {
        const dir = path.join(__dirname, '../../../out');
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        const characters = await generateRandomString(5);
        imageName = `huyeny-img-${characters}-${index}.png`;
        imagePath = path.join(dir, imageName);

        return new Promise<void>((resolve, reject) => {
          fs.writeFile(
            imagePath,
            Buffer.from(image.base64, 'base64'),
            (err) => {
              if (err) reject(err);
              else resolve();
            },
          );
        });
      });

      await Promise.all(writePromises);

      return {
        imageName,
        imagePath,
      };
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
