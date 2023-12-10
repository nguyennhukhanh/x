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
  ApplicationCommandOptionType,
  BaseMessageOptions,
  MessagePayload,
} from 'discord.js';
import { translate } from '@vitalets/google-translate-api';

import { BotService } from '../bot/bot.service';
import { TextToImageService } from '../bot/text-to-image.service';

const logger = new Logger('DiscordBot');

@Injectable()
export class DiscordService {
  private backendUrl: string;
  private client: Client;
  private discordClientSecret: string;
  private discordBotMessage: string;
  constructor(
    private configService: ConfigService,
    private readonly botService: BotService,
    private readonly textToImageService: TextToImageService,
  ) {
    this._setup();
  }

  async _setup() {
    this.backendUrl = this.configService.get('backend.backendUrl', {
      infer: true,
    }) as string;

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
      this.client.application.commands.create({
        name: 'image',
        description: 'Generate an image by text',
        options: [
          {
            name: 'text',
            type: ApplicationCommandOptionType.String,
            description: 'Thanks to the bot to create images from text',
            required: true,
          },
        ],
      });
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

    if (
      interaction.commandName === 'hello' ||
      interaction.commandName === 'start' ||
      interaction.commandName === 'name'
    ) {
      await interaction.reply(this.discordBotMessage);
      return;
    }

    // Method 1: Send image address
    // if (interaction.commandName === 'image') {
    //   const question = interaction.options.getString('text');

    //   // Defer the reply
    //   await interaction.deferReply();

    //   // Translate
    //   const { text } = await translate(question, { to: 'en' });

    //   const { imageName, imagePath } = await this.textToImageService.ask(text);

    //   let replyContent;
    //   if (imageName === null) {
    //     replyContent = 'Sorry, I was unable to generate the image.';
    //   } else {
    //     const imageUrl = this.backendUrl + '/' + imageName;
    //     replyContent = { content: imageUrl, ephemeral: true };
    //   }

    //   // Edit the reply
    //   await interaction.editReply(replyContent);
    //   return;
    // }

    // Method 2: Send image
    if (interaction.commandName === 'image') {
      const question = interaction.options.getString('text');

      // Translate
      const { text } = await translate(question, { to: 'en' });
      await interaction.deferReply();

      const { imageName, imagePath } = await this.textToImageService.ask(text);

      const options: BaseMessageOptions = {
        files: [
          {
            attachment: imagePath,
            name: imageName,
          },
        ],
      };

      const payload = new MessagePayload(interaction, options);

      await interaction.editReply(payload);
      return;
    }
  }
}
