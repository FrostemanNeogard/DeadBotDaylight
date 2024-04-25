const { SlashCommandBuilder } = require("discord.js");
const { getRandomSurvivor } = require("../../util/functions");

module.exports = {
  name: "randomsurvivor",
  data: new SlashCommandBuilder()
    .setName("randomsurvivor")
    .setDescription(`Responds with a random survivor name`),
  async execute(interaction) {
    const randomSurvivor = getRandomSurvivor();
    const responseMessage = `Your randomly selected survivor is: ${randomSurvivor}`;
    await interaction.reply({ ephemeral: true, content: responseMessage });
  },
};
