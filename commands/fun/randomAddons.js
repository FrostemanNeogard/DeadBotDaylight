const { SlashCommandBuilder } = require("discord.js");
const { getRandomAddons } = require("../../util/functions");

module.exports = {
  name: "randomaddons",
  category: "info",
  permissions: [],
  devCommand: false,
  data: new SlashCommandBuilder()
    .setName("randomaddons")
    .setDescription(
      `Replies with a set of random addons for a given killer or item.`
    )
    .addStringOption((option) =>
      option
        .setName("owner")
        .setDescription("Killer or survivor item.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const ownerName = interaction.options.getString("owner");
    const addons = getRandomAddons(ownerName);
    if (!addons) {
      return interaction.reply({
        ephemeral: true,
        content: `Couldn't find addons for: "${ownerName}".`,
      });
    }
    await interaction.reply({
      ephemeral: true,
      content: `**Your random addons are: **\n- ${addons.join("\n- ")}`,
    });
  },
};
