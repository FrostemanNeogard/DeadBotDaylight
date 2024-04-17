const { SlashCommandBuilder, Colors } = require("discord.js");
const data = require("../../data.json");
const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
  name: "perk",
  category: "main",
  permissions: [],
  devCommand: false,
  data: new SlashCommandBuilder()
    .setName("perk")
    .setDescription(`Replies with information about a given perk.`)
    .addStringOption((option) =>
      option
        .setName("perkname")
        .setDescription("Perk name to search for")
        .setRequired(true)
        .addChoices(
          {
            name: "Lithe",
            value: "Lithe",
          },
          {
            name: "Nurse's Calling",
            value: "A Nurse's Calling",
          }
        )
    ),
  async execute(interaction) {
    const unformattedPerkName = interaction.options.getString("perkname");
    const perkData = data.filter(
      (item) =>
        formatPerkName(item.name) === formatPerkName(unformattedPerkName)
    );
    if (!perkData) {
      await interaction.reply(
        `Couldn't find the given perk: "${unformattedPerkName}"`
      );
    }
    console.log(perkData);
    const responseEmbed = new EmbedBuilder()
      .setColor(Colors.Purple)
      .setThumbnail(perkData[0].image)
      .setTitle(perkData[0].name)
      .setFields(
        {
          name: "Description",
          value: perkData[0].info,
        },
        {
          name: "Character",
          value: perkData[0].character,
        }
      );
    await interaction.reply({ embeds: [responseEmbed] });
  },
};

function formatPerkName(perkName) {
  let formattedPerkName = perkName
    .toLowerCase()
    .replaceAll("'", "")
    .replaceAll("and", "&");
  return formattedPerkName;
}
