const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "randomaddonqualities",
  category: "info",
  permissions: [],
  devCommand: false,
  data: new SlashCommandBuilder()
    .setName("randomaddonqualities")
    .setDescription(`Responds with two random addon qualities`),
  async execute(interaction) {
    let killers = [
      "Brown",
      "Yellow",
      "Green",
      "Purple",
      "Iridescent",
      "Anniversary",
    ];

    const addons = [];
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * killers.length);
      addons.push(killers[randomIndex]);
    }
    const responseMessage = `Your randomly selected addon qualities are:\n- ${addons.join(
      "\n- "
    )}`;
    await interaction.reply({ ephemeral: true, content: responseMessage });
  },
};
