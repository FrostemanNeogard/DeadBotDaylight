const { SlashCommandBuilder } = require("discord.js");
const { getRandomOffering } = require("../../util/functions");

module.exports = {
  name: "randomoffering",
  category: "info",
  permissions: [],
  devCommand: false,
  data: new SlashCommandBuilder()
    .setName("randomoffering")
    .setDescription(`Responds with a random offering quality`),
  async execute(interaction) {
    const randomOffering = getRandomOffering();
    const responseMessage = `Your randomly selected offering quality is:\n- ${randomOffering}`;
    await interaction.reply({ ephemeral: true, content: responseMessage });
  },
};
