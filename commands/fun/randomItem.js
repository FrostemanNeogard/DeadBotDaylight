const { SlashCommandBuilder } = require("discord.js");
const { getRandomItem } = require("../../util/functions");

module.exports = {
  name: "randomitem",
  category: "info",
  permissions: [],
  devCommand: false,
  data: new SlashCommandBuilder()
    .setName("randomitem")
    .setDescription(`Responds with a random survivor item.`),
  async execute(interaction) {
    const randomItem = getRandomItem();
    const responseMessage = `Your randomly selected item is: "${randomItem}".`;
    await interaction.reply({ ephemeral: true, content: responseMessage });
  },
};
