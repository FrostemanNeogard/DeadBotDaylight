const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "randomoffering",
  category: "info",
  permissions: [],
  devCommand: false,
  data: new SlashCommandBuilder()
    .setName("randomoffering")
    .setDescription(`Responds with a random offering quality`),
  async execute(interaction) {
    let offerings = ["Brown", "Yellow", "Green", "Purple"];

    const randomIndex = Math.floor(Math.random() * offerings.length);
    const randomOffering = offerings[randomIndex];
    const responseMessage = `Your randomly selected offering quality is:\n- ${randomOffering}`;
    await interaction.reply({ ephemeral: true, content: responseMessage });
  },
};
