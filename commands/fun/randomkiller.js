const { SlashCommandBuilder } = require("discord.js");
const { getRandomKiller } = require("../../util/functions");

module.exports = {
  name: "randomkiller",
  data: new SlashCommandBuilder()
    .setName("randomkiller")
    .setDescription(`Responds with a random killer name`)
    .addBooleanOption((option) =>
      option
        .setName("hidden")
        .setDescription(
          "Whether or not to hide the response message for others. Defaults to false."
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    const randomKiller = getRandomKiller();
    const responseMessage = `Your randomly selected killer is: ${randomKiller}`;
    await interaction.reply({ ephemeral: isPrivate, content: responseMessage });
  },
};
