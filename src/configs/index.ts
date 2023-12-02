import { ConfigFactory } from '@nestjs/config';

import gpt from './gpt.config';
import telegram from './telegram.config';
import discord from './discord.config';

export const load: ConfigFactory[] = [gpt, telegram, discord];
