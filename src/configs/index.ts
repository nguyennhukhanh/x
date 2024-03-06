import type { ConfigFactory } from '@nestjs/config';

import discord from './discord.config';
import firebase from './firebase.config';
import gemini from './gemini.config';
import main from './main.config';
import painter from './painter.config';
import telegram from './telegram.config';

export const load: ConfigFactory[] = [
  main,
  gemini,
  painter,
  telegram,
  discord,
  firebase,
];
