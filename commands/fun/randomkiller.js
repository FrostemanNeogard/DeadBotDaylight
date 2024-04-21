const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "randomkiller",
  category: "info",
  permissions: [],
  devCommand: false,
  data: new SlashCommandBuilder()
    .setName("randomkiller")
    .setDescription(`Responds with a random killer name`),
  async execute(interaction) {
    let killers = [
      "Trapper",
      "Wraith",
      "Hillbilly",
      "Nurs",
      "Huntress",
      "Myers",
      "Hag",
      "Doctor",
      "Pig",
      "Clown",
      "Spirit",
      "Legion",
      "Plague",
      "Ghostface",
      "Demogorgon",
      "Deathslinger",
      "Pyramid head",
      "Blight",
      "Twins",
      "Trickster",
      "Nemesis",
      "Artist",
      "Unknown",
      "Chucky",
      "Xenomorph",
      "Singularity",
      "Skull merchant",
      "Knight",
      "Wesker",
      "Dredge",
      "Sadako",
      "Pinhead",
      "Oni",
      "Nightmare",
      "Bubba",
    ];

    const randomIndex = Math.floor(Math.random() * killers.length);
    const responseMessage = `Your randomly selected killer is: ${killers[randomIndex]}`;
    await interaction.reply({ ephemeral: true, content: responseMessage });
  },
};
