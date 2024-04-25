const { SlashCommandBuilder } = require("discord.js");
const { getRandomOffering } = require("../../util/functions");

module.exports = {
  name: "randomoffering",
  data: new SlashCommandBuilder()
    .setName("randomoffering")
    .setDescription(`Responds with a random offering quality`)
    .addBooleanOption((option) =>
      option
        .setName("hidden")
        .setDescription(
          "Whether or not to hide the response message for others. Defaults to false."
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    const randomOffering = getRandomOffering();
    const isPrivate = interaction.options.getBoolean("hidden");
    const responseMessage = `Your randomly selected offering quality is:\n- ${randomOffering}`;
    await interaction.reply({ ephemeral: isPrivate, content: responseMessage });
  },
};
