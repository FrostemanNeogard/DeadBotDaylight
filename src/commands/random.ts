import {
  ApplicationCommandOptionType,
  type CommandInteraction,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { fetchRandomKiller } from "../util/functions";
import { Killer } from "../__types/killer";

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
    const randomKiller: Killer = await fetchRandomKiller();
    const responseMessage = `Your randomly selected killer is: ${randomKiller.name}`;
    await interaction.reply({ ephemeral: hidden, content: responseMessage });
  }
}
