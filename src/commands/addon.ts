import {
  ApplicationCommandOptionType,
  EmbedBuilder,
  type CommandInteraction,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { fetchAddonData, fetchPerkData } from "../util/functions";
import { COLORS } from "../util/config";
import { Addon } from "../__types/addon";
import { ADDON_QUALITIES } from "../util/constants";

@Discord()
export class AddonCommands {
  @Slash({
    description: `Replies with information about a given addon.`,
  })
  async addon(
    @SlashOption({
      name: `addonname`,
      description: `Addon name to search for`,
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    addonName: string,
    @SlashOption({
      name: `for`,
      description: `Killer- or itemname for the given addon`,
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    owner: string,
    interaction: CommandInteraction
  ): Promise<void> {
    const addonData = await fetchAddonData(addonName, owner);
    if (!addonData) {
      return;
    }
    const responseEmbed = new EmbedBuilder()
      .setColor(COLORS.main)
      .setTitle(addonData.name)
      .setThumbnail(addonData.imageSrc)
      .setURL(addonData.href)
      .setFields(
        {
          name: "Description",
          value: addonData.description,
        },
        {
          name: "Quality",
          value: ADDON_QUALITIES[addonData.quality],
        }
      );
    await interaction.reply({ embeds: [responseEmbed] });
  }
}
