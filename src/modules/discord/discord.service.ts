import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Client,
  Message,
  GuildMember,
  GatewayIntentBits,
  Events,
  Interaction,
  CacheType,
} from 'discord.js';

import { BotService } from '../bot/bot.service';

const logger = new Logger('DiscordBot');

@Injectable()
export class DiscordService {
  private client: Client;
  private discordClientSecret: string;
  private discordBotMessage: string;

  constructor(
    private configService: ConfigService,
    private readonly botService: BotService,
  ) {
    this._setup();
  }

  async _setup() {
    this.discordClientSecret = this.configService.get(
      'discord.discordClientSecret',
      {
        infer: true,
      },
    ) as string;

    this.discordBotMessage = this.configService.get(
      'discord.discordBotMessage',
      {
        infer: true,
      },
    ) as string;

    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
      ],
    });

    this.client.on(Events.ClientReady, () => {
      logger.log(`Bot is ready! Logged in as ${this.client.user?.tag}!`);
    });

    this.client.on(Events.MessageCreate, (msg) => {
      this.handleMessage(msg);
    });

    this.client.on(Events.InteractionCreate, async (interaction) => {
      await this.handleStartCommand(interaction);
    });

    this.client.on(Events.GuildMemberAdd, (member) => {
      this.handleNewMemberJoined(member);
    });

    this.client.on(Events.GuildMemberRemove, (member) => {
      if (member instanceof GuildMember) {
        this.handleMemberLeft(member);
      }
    });

    this.client.login(this.discordClientSecret);
  }

  handleMessage = async ({ author, content, channel }: Message) => {
    if (author.bot) {
      return;
    }

    const answer = await this.botService.ask(content);

    channel.send(answer);
  };

  handleNewMemberJoined({ user, guild }: GuildMember) {
    const channel = guild.systemChannel;
    if (!channel) return;

    const fullName = user.displayName;
    const username = user.username;

    const message =
      username === undefined
        ? `Welcome ${fullName} to the server!`
        : `Welcome @${username} to the server!`;

    channel.send(message);
  }

  handleMemberLeft({ user, guild }: GuildMember) {
    const channel = guild.systemChannel;
    if (!channel) return;

    const fullName = user.displayName;
    const username = user.username;

    const message =
      username === undefined
        ? `${fullName} has left the server!`
        : `@${username} has left the server!`;

    channel.send(message);
  }

  async handleStartCommand(interaction: Interaction<CacheType>) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'start' || 'name' || 'hello') {
      await interaction.reply(this.discordBotMessage);
    }
  }
}
