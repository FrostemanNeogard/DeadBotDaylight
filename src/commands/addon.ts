import {
  ApplicationCommandOptionType,
  EmbedBuilder,
  type CommandInteraction,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { fetchPerkData } from "../util/functions";
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
    interaction: CommandInteraction
  ): Promise<void> {
    const addonData: Addon = await fetchPerkData(addonName);
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
