import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import { FirebaseStorageService } from 'src/services/firebase_storage.service';
import { getLogger } from 'src/utils/logger';
import { v4 as uuidv4 } from 'uuid';

import type { IGenerationResponse } from '../../shared/interfaces/generation_response.interface';

const logger = getLogger('PainterBot');

@Injectable()
export class TextToImageService {
  private engineId: string;
  private apiHost: string;
  private apiKey: string;

  constructor(
    private configService: ConfigService,
    private fileService: FirebaseStorageService,
  ) {
    this._init();
  }

  _init(): void {
    this.engineId = this.configService.get('painter.engineId');
    this.apiHost = this.configService.get('painter.apiHost');
    this.apiKey = this.configService.get('painter.apiKey');

    logger.info('Painter is ready!');
  }

  async ask(
    question: string,
  ): Promise<{ imageName: string; imageUrl: string }> {
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

      const responseJSON = (await response.json()) as IGenerationResponse;

      const characters = await uuidv4();
      const originalname = `huyeny-img-${characters}.png`;
      let imageUrl = '';

      const uploadPromises = responseJSON.artifacts.map(
        async (image, index) => {
          const file = {
            originalname,
            buffer: Buffer.from(image.base64, 'base64'),
            mimetype: 'image/png',
          } as any;

          imageUrl = await this.fileService.uploadFile(file);
        },
      );

      await Promise.all(uploadPromises);

      return {
        imageName: originalname,
        imageUrl,
      };
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
