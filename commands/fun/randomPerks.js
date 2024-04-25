const { SlashCommandBuilder } = require("discord.js");
const { getRandomPerks } = require("../../util/functions");

module.exports = {
  name: "randomperks",
  category: "info",
  permissions: [],
  devCommand: false,
  data: new SlashCommandBuilder()
    .setName("randomperks")
    .setDescription(`Replies with a random perk.`)
    .addStringOption((option) =>
      option
        .setName("role")
        .setDescription("Killer or survivor perk.")
        .addChoices(
          {
            name: "Survivor",
            value: "s",
          },
          {
            name: "Killer",
            value: "k",
          }
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const isKillerPerk =
      interaction.options.getString("role") == "k" ? true : false;
    const perks = getRandomPerks(isKillerPerk);
    await interaction.reply({
      ephemeral: true,
      content: `**Your random perks are: **\n- ${perks.join("\n- ")}`,
    });
  },
};
