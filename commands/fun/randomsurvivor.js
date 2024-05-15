const { SlashCommandBuilder } = require("discord.js");
const { getRandomSurvivor } = require("../../util/functions");

module.exports = {
  name: "randomsurvivor",
  data: new SlashCommandBuilder()
    .setName("randomsurvivor")
    .setDescription(`Responds with a random survivor name`)
    .addBooleanOption((option) =>
      option
        .setName("hidden")
        .setDescription(
          "Whether or not to hide the response message for others. Defaults to false."
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    const randomSurvivor = await getRandomSurvivor();
    const isPrivate = interaction.options.getBoolean("hidden");
    const responseMessage = `Your randomly selected survivor is: ${randomSurvivor}`;
    await interaction.reply({ ephemeral: isPrivate, content: responseMessage });
  },
};
