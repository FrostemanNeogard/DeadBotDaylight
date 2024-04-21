const { SlashCommandBuilder, Colors } = require("discord.js");
const data = require("../../data/addons.json");
const { EmbedBuilder } = require("@discordjs/builders");

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
        .setName("killername")
        .setDescription("Killer name")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("addonname")
        .setDescription("Addon name to search for")
        .setRequired(true)
    ),
  async execute(interaction) {
    const killerName = interaction.options.getString("killername");
    const addonName = interaction.options.getString("addonname");
    const allAddons = data.filter((item) => item.name === killerName);
    if (!allAddons) {
      await interaction.reply("shiiid");
    }
    const addon = allAddons[0].addons.filter(
      (item) => item.name === addonName
    )[0];
    console.log(allAddons);
    console.log(addon);
    if (!addon) {
      await interaction.reply(
        `Couldn't find the specified addon "${addonName}" for: "${killerName}"`
      );
    }

    const responseEmbed = new EmbedBuilder()
      .setColor(Colors.Purple)
      .setTitle(killerName)
      .setFields(
        {
          name: "Name",
          value: addon.name || "no",
        },
        {
          name: "Description",
          value: addon.description || "no",
        }
      );
    await interaction.reply({ embeds: [responseEmbed] });
  },
};
