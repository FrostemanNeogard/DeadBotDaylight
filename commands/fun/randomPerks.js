const { SlashCommandBuilder } = require("discord.js");
const data = require("../../data/perks.json");

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
    let perkName = "";
    let perks = [];
    if (isKillerPerk) {
      for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * data.killer.length);
        perkName = data.killer[randomIndex].name;
        perks.push(perkName);
      }
    } else {
      for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * data.killer.length);
        perkName = data.survivor[randomIndex].name;
        perks.push(perkName);
      }
    }

    await interaction.reply({
      ephemeral: true,
      content: `**Your random perks are: **\n- ${perks.join("\n- ")}`,
    });
  },
};
