const { SlashCommandBuilder, Colors } = require("discord.js");
const data = require("../../data/perks.json");
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
    ),
  async execute(interaction) {
    const unformattedPerkName = interaction.options.getString("perkname");
    const allData = [...data.survivor, ...data.killer];
    const perkData = allData.filter(
      (item) =>
        formatPerkName(item.name) === formatPerkName(unformattedPerkName)
    );
    if (!perkData) {
      await interaction.reply(
        `Couldn't find the given perk: "${unformattedPerkName}"`
      );
    }
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
