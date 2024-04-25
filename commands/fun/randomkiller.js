const { SlashCommandBuilder } = require("discord.js");
const { getRandomKiller } = require("../../util/functions");

module.exports = {
  name: "randomkiller",
  data: new SlashCommandBuilder()
    .setName("randomkiller")
    .setDescription(`Responds with a random killer name`),
  async execute(interaction) {
    const randomIndex = Math.floor(Math.random() * killers.length);
    const randomKiller = killers[randomIndex];
    const responseMessage = `Your randomly selected killer is: ${randomKiller}`;
    await interaction.reply({ ephemeral: true, content: responseMessage });
  },
};
