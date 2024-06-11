import {
  ApplicationCommandOptionType,
  EmbedBuilder,
  type CommandInteraction,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { fetchPerkData } from "../util/functions";
import { COLORS } from "../util/config";
import { Perk } from "../__types/perk";

@Discord()
export class PerkCommands {
  @Slash({
    description: `Replies with information about a given perk.`,
  })
  async perk(
    @SlashOption({
      name: `perkname`,
      description: `Perk name to search for`,
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    perkName: string,
    interaction: CommandInteraction
  ): Promise<void> {
    const perkData: Perk | void = await fetchPerkData(perkName);
    if (!perkData) {
      await interaction.reply(
        `Couldn't fetch perk data. Please try again later.`
      );
      return;
    }
    const responseEmbed = new EmbedBuilder()
      .setColor(COLORS.main)
      .setThumbnail(perkData.image)
      .setTitle(perkData.name)
      .setFields(
        {
          name: "Description",
          value: perkData.info,
        },
        {
          name: "Character",
          value: perkData.character,
        }
      );
    await interaction.reply({ embeds: [responseEmbed] });
  }
}
