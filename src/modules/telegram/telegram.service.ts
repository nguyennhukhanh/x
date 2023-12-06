import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

import { BotService } from '../bot/bot.service';
import { Events } from '../../utils/constants/common.enum';

const logger = new Logger('TelegramBot');

@Injectable()
export class TelegramService {
  private telegramBot: TelegramBot;
  private telegramBotId: string;
  private telegramBotMessage: string;

  constructor(
    private configService: ConfigService,
    private readonly botService: BotService,
  ) {
    this._setup();
  }
  async _setup() {
    const botToken = this.configService.get('telegram.telegramBotToken', {
      infer: true,
    }) as string;
    this.telegramBotId = botToken.split(':')[0];

    this.telegramBotMessage = this.configService.get(
      'telegram.telegramBotMessage',
      {
        infer: true,
      },
    ) as string;

    this.telegramBot = new TelegramBot(botToken, { polling: true });

    this.telegramBot.on(Events.PollingError, (error) => {
      logger.error('Polling Error', error);
    });

    this.telegramBot.on(Events.NewChatMembers, async (msg) => {
      this.handleEvent(() => this.handleNewMemberJoined(msg));
    });

    this.telegramBot.on(Events.LeftChatMember, async (msg) => {
      this.handleEvent(() => this.handleMemberLeft(msg));
    });

    this.telegramBot.on(Events.Message, async (msg) => {
      this.handleEvent(async () => this.handleAsk(msg));
    });

    this.telegramBot.onText(/\/start/, (msg) => {
      this.handleEvent(() => this.handleStartCommand(msg));
    });
  }

  handleEvent = (_cb: () => void) => {
    try {
      _cb();
    } catch (error) {
      logger.error(error);
    }
  };

  handleNewMemberJoined = ({ chat, new_chat_members }: TelegramBot.Message) => {
    const chatId = chat.id;
    const newMembers = new_chat_members;

    for (const newMember of newMembers) {
      if (String(newMember.id) === this.telegramBotId) {
        const message = this.telegramBotMessage;
        this.telegramBot.sendMessage(chatId, message);
      } else {
        const fullName = `${newMember.first_name} ${newMember.last_name}`;
        const username = newMember.username;
        const message =
          username === undefined
            ? `Welcome ${fullName} to the group!`
            : `Welcome @${username} to the group!`;

        this.telegramBot.sendMessage(chatId, message);
      }
    }
  };

  handleMemberLeft = ({ chat, left_chat_member }: TelegramBot.Message) => {
    const chatId = chat.id;
    const leftMember = left_chat_member;

    const fullName = `${leftMember.first_name} ${leftMember.last_name}`;
    const username = leftMember.username;
    const message =
      username === undefined
        ? `${fullName} has left the group!`
        : `@${username} has left the group!`;

    this.telegramBot.sendMessage(chatId, message);
  };

  handleAsk = async ({ chat, text }: TelegramBot.Message) => {
    const userQuestion = text;
    if (!userQuestion) return;

    const chatId = chat.id;

    const answer = await this.botService.ask(userQuestion);
    try {
      await this.telegramBot.sendMessage(chatId, answer, {
        parse_mode: 'Markdown',
      });
    } catch (error) {
      if (
        error.message.includes(
          "ETELEGRAM: 400 Bad Request: can't parse entities: Can't find end of the entity starting at byte offset",
        )
      ) {
        await this.telegramBot.sendMessage(chatId, answer);
      } else {
        logger.error(error.message);
      }
    }
  };

  handleStartCommand = ({ chat }: TelegramBot.Message) => {
    const chatId = chat.id;
    const message = this.telegramBotMessage;

    this.telegramBot.sendMessage(chatId, message);
  };
}
