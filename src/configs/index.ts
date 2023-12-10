import { ConfigFactory } from '@nestjs/config';

import gpt from './gpt.config';
import telegram from './telegram.config';
import discord from './discord.config';
import painter from './painter.config';
import backend from './backend.config';

export const load: ConfigFactory[] = [backend, gpt, painter, telegram, discord];
