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
    )
    .addBooleanOption((option) =>
      option
        .setName("hidden")
        .setDescription(
          "Whether or not to hide the response message for others. Defaults to false."
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    const ownerName = interaction.options.getString("for");
    const isPrivate = interaction.options.getBoolean("hidden");
    const addons = getRandomAddons(ownerName);
    if (!addons) {
      return interaction.reply({
        ephemeral: isPrivate,
        content: `Couldn't find addons for: "${ownerName}".`,
      });
    }
    await interaction.reply({
      ephemeral: isPrivate,
      content: `**Your random addons are: **\n- ${addons.join("\n- ")}`,
    });
  },
};
