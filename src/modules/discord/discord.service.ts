import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { translate } from '@vitalets/google-translate-api';
import type { CacheType, Interaction, Message } from 'discord.js';
import {
  ApplicationCommandOptionType,
  Client,
  Events,
  GatewayIntentBits,
  GuildMember,
} from 'discord.js';
import { getLogger } from 'src/utils/logger';

import { GeminiService } from '../bot/gemini.service';
// import { GPTService } from '../bot/gpt.service';
import { TextToImageService } from '../bot/text-to-image.service';

const logger = getLogger('DiscordBot');

@Injectable()
export class DiscordService {
  private backendUrl: string;
  private client: Client;
  private clientSecret: string;
  private message: string;
  constructor(
    private configService: ConfigService,
    // private readonly gptService: GPTService,
    private readonly geminiService: GeminiService,
    private readonly textToImageService: TextToImageService,
  ) {
    this._init();
  }

  async _init(): Promise<void> {
    this.backendUrl = this.configService.get('main.backendUrl', {
      infer: true,
    }) as string;

    this.clientSecret = this.configService.get('discord.clientSecret', {
      infer: true,
    }) as string;

    this.message = this.configService.get('discord.message', {
      infer: true,
    }) as string;

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
      logger.info(`Bot is ready! Logged in as ${this.client.user?.tag}!`);
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

    this.client.login(this.clientSecret);

    logger.info('Discord is ready!');
  }

  handleMessage = async ({ author, content, channel }: Message) => {
    if (author.bot) {
      return;
    }

    // Method 1: Using GPT Bot
    // const answer = await this.gptService.ask(content);

    // Method 2: Using Gemini Bot
    const answer = await this.geminiService.ask(content);

    if (answer.length > 2000) {
      // Split the answer into chunks of 2000 characters
      const chunks = answer.match(/.{1,2000}/g);

      // Send each chunk as a separate message
      for (const chunk of chunks) {
        channel.send(chunk);
      }
    } else {
      channel.send(answer);
    }
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
      await interaction.reply(this.message);
      return;
    }

    // Method 1: Send image address
    if (interaction.commandName === 'image') {
      const question = interaction.options.getString('text');

      // Defer the reply
      await interaction.deferReply();

      // Translate
      const { text } = await translate(question, { to: 'en' });

      const result = await this.textToImageService.ask(text);
      if (result) {
        const { imageUrl, imageName } = result;
        let replyContent;
        if (imageName === null) {
          replyContent = 'Sorry, I was unable to generate the image.';
        } else {
          replyContent = { content: imageUrl, ephemeral: true };
        }

        // Edit the reply
        await interaction.editReply(replyContent);
        return;
      } else {
        await interaction.editReply(
          'Sorry, I was unable to generate the image.',
        );
        return;
      }
    }

    // Method 2: Send image
    // if (interaction.commandName === 'image') {
    //   const question = interaction.options.getString('text');

    //   // Translate
    //   const { text } = await translate(question, { to: 'en' });
    //   await interaction.deferReply();

    //   const result = await this.textToImageService.ask(text);
    //   if (result) {
    //     const { imageName, imageUrl } = result;
    //     const options: BaseMessageOptions = {
    //       files: [
    //         {
    //           attachment: imageUrl,
    //           name: imageName,
    //         },
    //       ],
    //     };

    //     const payload = new MessagePayload(interaction, options);

    //     await interaction.editReply(payload);
    //     return;
    //   } else {
    //     await interaction.editReply(
    //       'Sorry, I was unable to generate the image.',
    //     );
    //     return;
    //   }
    // }
  }
}
