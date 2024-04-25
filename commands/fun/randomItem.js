const { SlashCommandBuilder } = require("discord.js");
const { getRandomItem } = require("../../util/functions");

module.exports = {
  name: "randomitem",
  data: new SlashCommandBuilder()
    .setName("randomitem")
    .setDescription(`Responds with a random survivor item.`)
    .addBooleanOption((option) =>
      option
        .setName("hidden")
        .setDescription(
          "Whether or not to hide the response message for others. Defaults to false."
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    const isPrivate = interaction.options.getBoolean("hidden");
    const randomItem = getRandomItem();
    const responseMessage = `Your randomly selected item is: "${randomItem}".`;
    await interaction.reply({ ephemeral: isPrivate, content: responseMessage });
  },
};
