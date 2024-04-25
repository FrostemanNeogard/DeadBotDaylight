const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { main_color } = require("../../config.json");

module.exports = {
  name: "help",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription(`Replies with information regarding how to use this bot.`),
  async execute(interaction) {
    const helpEmbed = new EmbedBuilder()
      .setColor(main_color)
      .setTitle("Help")
      .addFields(
        {
          name: "Test",
          value: "adawdaw",
        },
        {
          name: "adwdwa",
          value: "daw",
        }
      )
      .setFooter({ text: `Bot created by "funnyorangcat".` });

    await interaction.reply({ embeds: [helpEmbed] });
  },
};
