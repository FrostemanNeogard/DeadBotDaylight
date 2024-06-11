import {
  ApplicationCommandOptionType,
  AutocompleteInteraction,
  EmbedBuilder,
  Role,
  type CommandInteraction,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import {
  fetchRandomAddons,
  fetchRandomItems,
  fetchRandomKillers,
  fetchRandomOfferings,
  fetchRandomPerks,
  fetchRandomSurvivors,
} from "../util/functions";
import { Killer } from "../__types/killer";
import { Survivor } from "../__types/survivor";
import { Addon } from "../__types/addon";
import { Item } from "../__types/item";
import { ROLES } from "../util/constants";
import { Perk } from "../__types/perk";
import { Offering } from "../__types/offering";
import { COLORS } from "../util/config";

@Discord()
export class RandomCommands {
  @Slash({
    description: `Responds with a random killer name`,
  })
  async randomkiller(
    @SlashOption({
      name: `hidden`,
      description: `Whether or not to hide the response message for others. Defaults to false.`,
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    })
    hidden: boolean,
    interaction: CommandInteraction
  ): Promise<void> {
    const randomKillers: Killer[] | void = await fetchRandomKillers();
    if (!randomKillers) {
      await interaction.reply(
        `An error ocurred when fetching random killer. Please try again later.`
      );
      return;
    }
    const responseMessage = `Your randomly selected killer is: ${randomKillers[0].name}`;
    await interaction.reply({ ephemeral: hidden, content: responseMessage });
  }

  @Slash({
    description: `Responds with a random survivor name`,
  })
  async randomsurvivor(
    @SlashOption({
      name: `hidden`,
      description: `Whether or not to hide the response message for others. Defaults to false.`,
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    })
    hidden: boolean,
    interaction: CommandInteraction
  ): Promise<void> {
    const randomSurvivors: Survivor[] | void = await fetchRandomSurvivors();
    if (!randomSurvivors) {
      await interaction.reply(
        `An error ocurred when fetching random survivor. Please try again later.`
      );
      return;
    }
    const responseMessage = `Your randomly selected survivor is: ${randomSurvivors[0].name}`;
    await interaction.reply({ ephemeral: hidden, content: responseMessage });
  }

  @Slash({
    description: `Responds with two random addons for the given killer or item`,
  })
  async randomaddons(
    @SlashOption({
      name: `for`,
      description: `Name of killer or survivor item to get addons for.`,
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    owner: string,
    @SlashOption({
      name: `hidden`,
      description: `Whether or not to hide the response message for others. Defaults to false.`,
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    })
    hidden: boolean,
    interaction: CommandInteraction
  ): Promise<void> {
    const randomAddons: Addon[] | void = await fetchRandomAddons(owner);
    if (!randomAddons) {
      await interaction.reply(
        `An error ocurred when fetching random addons. Please try again later.`
      );
      return;
    }
    const responseMessage = `Your randomly selected addons are: ${randomAddons
      .map((addon) => addon.name)
      .join("\n- ")}`;
    await interaction.reply({ ephemeral: hidden, content: responseMessage });
  }

  @Slash({
    description: `Responds with a random survivor item.`,
  })
  async randomitem(
    @SlashOption({
      name: `hidden`,
      description: `Whether or not to hide the response message for others. Defaults to false.`,
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    })
    hidden: boolean,
    interaction: CommandInteraction
  ): Promise<void> {
    const randomItems: Item[] | void = await fetchRandomItems();
    if (!randomItems) {
      await interaction.reply(
        `An error ocurred when fetching random items. Please try again later.`
      );
      return;
    }
    const responseMessage = `Your randomly selected item is: ${randomItems[0]}`;
    await interaction.reply({ ephemeral: hidden, content: responseMessage });
  }

  @Slash({
    description: `Responds with a random loadout for the given role`,
  })
  async randomloadout(
    @SlashOption({
      name: `role`,
      description: `Role to create a loadout for`,
      autocomplete: function (this: any, interaction: AutocompleteInteraction) {
        interaction.respond([
          { name: "Killer", value: ROLES.Killer },
          { name: "Survivor", value: ROLES.Survivor },
        ]);
      },
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    role: string,
    @SlashOption({
      name: `hidden`,
      description: `Whether or not to hide the response message for others. Defaults to false.`,
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    })
    hidden: boolean,
    interaction: CommandInteraction
  ): Promise<void> {
    const isKiller = role == ROLES.Killer;

    const randomCharacter: Survivor[] | Killer[] | void = isKiller
      ? await fetchRandomKillers()
      : await fetchRandomSurvivors();
    if (!randomCharacter) {
      return;
    }

    const randomPerks: Perk[] | void = await fetchRandomPerks(isKiller);
    if (!randomPerks) {
      return;
    }

    const randomItem: Item[] | void = await fetchRandomItems();
    if (!randomItem) {
      return;
    }

    const randomAddons: Addon[] | void = await fetchRandomAddons(
      isKiller ? randomCharacter[0].name : randomItem[0].name
    );
    if (!randomAddons) {
      return;
    }

    const randomOffering: Offering[] | void = await fetchRandomOfferings(
      isKiller
    );
    if (!randomOffering) {
      return;
    }

    const responseEmbed = new EmbedBuilder()
      .setColor(COLORS.main)
      .setTitle(`Randomized ${isKiller ? "Killer" : "Survivor"} loadout`)
      .setFields(
        {
          name: "Character",
          value: randomCharacter[0].name,
        },
        {
          name: "Offering",
          value: randomOffering[0].name,
        }
      );

    if (!isKiller) {
      responseEmbed.addFields({
        name: "Item",
        value: randomItem[0].name || "N/A",
      });
    }

    responseEmbed.addFields(
      {
        name: "Perks",
        value: randomPerks.map((item) => item.name).join("\n"),
      },
      {
        name: "Add-ons",
        value: randomAddons.map((addon) => addon.name).join("\n"),
      }
    );

    await interaction.reply({ ephemeral: hidden, embeds: [responseEmbed] });
  }
}
