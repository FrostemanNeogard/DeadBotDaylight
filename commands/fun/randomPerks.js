const { SlashCommandBuilder } = require("discord.js");
const { getRandomPerks } = require("../../util/functions");

module.exports = {
  name: "randomperks",
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
    )
    .addBooleanOption((option) =>
      option
        .setName("hidden")
        .setDescription(
          "Whether or not to hide the response message for others. Defaults to false."
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    const isKillerPerk =
      interaction.options.getString("role") == "k" ? true : false;
    const isPrivate = interaction.options.getBoolean("hidden");
    const perks = getRandomPerks(isKillerPerk);
    await interaction.reply({
      ephemeral: isPrivate,
      content: `**Your random perks are: **\n- ${perks.join("\n- ")}`,
    });
  },
};
