const { SlashCommandBuilder } = require("discord.js");
const { getRandomAddons } = require("../../util/functions");

module.exports = {
  name: "randomaddons",
  data: new SlashCommandBuilder()
    .setName("randomaddons")
    .setDescription(
      `Replies with a set of random addons for a given killer or item.`
    )
    .addStringOption((option) =>
      option
        .setName("for")
        .setDescription("Name of killer or survivor item to fetch addons for.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const ownerName = interaction.options.getString("for");
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
