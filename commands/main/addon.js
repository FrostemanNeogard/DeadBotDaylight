const { SlashCommandBuilder, Colors } = require("discord.js");
const data = require("../../data/addons.json");
const { EmbedBuilder } = require("@discordjs/builders");
const {
  defaultTextFormatter,
  ADDON_QUALITIES,
  getRandomAddons,
  fetchAddonData,
} = require("../../util/functions");

module.exports = {
  name: "addon",
  category: "main",
  permissions: [],
  devCommand: false,
  data: new SlashCommandBuilder()
    .setName("addon")
    .setDescription(
      `Replies with information about a given addon for a given killer.`
    )
    .addStringOption((option) =>
      option
        .setName("for")
        .setDescription("Name of the killer/item")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("addonname")
        .setDescription("Name of the addon")
        .setRequired(true)
    ),
  async execute(interaction) {
    const killerName = interaction.options.getString("killername");
    const addonName = interaction.options.getString("addonname");

    const addon = fetchAddonData(killerName, addonName);

    if (!addon) {
      await interaction.reply(
        `Couldn't find the specified addon "${addonName}" for: "${killerName}"`
      );
      return;
    }

    const responseEmbed = new EmbedBuilder()
      .setColor(Colors.Purple)
      .setTitle(addon.name)
      .setThumbnail(addon.imageSrc)
      .setURL(addon.href)
      .setFields(
        {
          name: "For",
          value: allAddons[0].name || "???",
          inline: true,
        },
        {
          name: "Quality",
          value: ADDON_QUALITIES[addon.quality] || "???",
          inline: true,
        },
        {
          name: "Description",
          value: addon.description || "Description missing.",
        }
      );
    await interaction.reply({ embeds: [responseEmbed] });
  },
};
