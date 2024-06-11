import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
export class SampleCommand {
  @Slash({
    description: "Ping this client.",
  })
  async samplecommand(interaction: CommandInteraction): Promise<void> {
    await interaction.reply("Pong!");
  }
}
