const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "randomsurvivor",
  category: "info",
  permissions: [],
  devCommand: false,
  data: new SlashCommandBuilder()
    .setName("randomsurvivor")
    .setDescription(`Responds with a random survivor name`),
  async execute(interaction) {
    let survivors = [
      "Dwight Fairfield",
      "Meg Thomas",
      "Claudette Morel",
      "Jake Park",
      "Nea Karlsson",
      'William "Bill" Overbeck',
      "David King",
      "Laurie Strode",
      "Feng Min",
      "Detective Tapp",
      "Kate Densom",
      "Adam Francis",
      "Jeff Johansen",
      "Ashley J. Williams",
      "Nancy Wheeler",
      "Steve Harrington",
      "Zarina Kassir",
      "Cheryl Manson",
      "Felix Richter",
      "Yun-Jin Lee",
      "Jill Valentine",
      "Leon S. Kennedy",
      "Jonah Vasquez",
      "Gabriel Soma",
      "Sable Ward",
      "Alan Wake",
      "Ellen Ripley",
      "Nicolas Cage",
      "Renato Lyra",
      "Thalita Lyra",
      "Vittorio Toscano",
      "Rebecca Chambers",
      "Ada Wong",
      "Haddie Kaur",
      "Yoichi Asakawa",
      "Mikaela Reid",
      "Élodie Rakoto",
      "Yui Kimura",
      "Jane Romero",
      "Quentin Smith",
      "Ace Visconti",
    ];

    const randomIndex = Math.floor(Math.random() * survivors.length);
    const responseMessage = `Your randomly selected survivor is: ${survivors[randomIndex]}`;
    await interaction.reply(responseMessage);
  },
};
