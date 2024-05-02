const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
  getRandomKiller,
  getRandomSurvivor,
  getRandomOffering,
  getRandomItem,
  getRandomAddons,
  getRandomPerks,
} = require("../../util/functions");
const { main_color } = require("../../config.json");

module.exports = {
  name: "randomloadout",
  data: new SlashCommandBuilder()
    .setName("randomloadout")
    .setDescription(`Responds with a random survivor- or killer loadout`)
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
    const isKillerLoadout =
      interaction.options.getString("role") == "k" ? true : false;
    const isPrivate = interaction.options.getBoolean("hidden");

    let randomItem = isKillerLoadout ? null : getRandomItem();

    let items = [
      "Flashlight",
      "Sport Flashlight",
      "Utility Flashlight",
      "Broken key",
      "Dull Key",
      "Skeleton Key",
      "Map",
      "Rainbow Map",
      "Camping Aid Kit",
      "First Aid Kit",
      "Emergency Med-Kit",
      "Ranger Med-Kit",
      "Worn-Out Tools",
      "Toolbox",
      "Commodious Toolbox",
      "Mechanic's Toolbox",
      "Alex's Toolbox",
      "Engineer's Toolbox",
    ];

    const itemCode = items.slice(0, 3).includes(randomItem)
      ? "Flashlights"
      : items.slice(3, 6).includes(randomItem)
      ? "Keys"
      : items.slice(6, 8).includes(randomItem)
      ? "Maps"
      : items.slice(8, 12).includes(randomItem)
      ? "Med-Kits"
      : items.slice(12, 18).includes(randomItem)
      ? "Toolboxes"
      : "Toolboxes";

    let randomCharacter = isKillerLoadout
      ? getRandomKiller()
      : getRandomSurvivor();
    let randomOffering = getRandomOffering();
    const randomPerks = getRandomPerks(isKillerLoadout);
    const randomAddons = isKillerLoadout
      ? getRandomAddons(randomCharacter)
      : getRandomAddons(itemCode);

    if (
      !randomOffering ||
      !randomPerks ||
      randomPerks.length <= 0 ||
      randomAddons.length <= 0 ||
      !randomCharacter
    ) {
      console.error(
        `An error ocurred: ${
          (randomCharacter,
          randomAddons,
          randomPerks,
          randomOffering,
          randomItem)
        }`
      );
      return interaction.reply({
        ephemeral: isPrivate,
        content: `Something went wrong, please try again.`,
      });
    }

    const responseEmbed = new EmbedBuilder()
      .setColor(main_color)
      .setTitle(`Randomized ${isKillerLoadout ? "Killer" : "Survivor"} loadout`)
      .setFields(
        {
          name: "Character",
          value: randomCharacter,
        },
        {
          name: "Offering",
          value: randomOffering,
        }
      );

    if (!isKillerLoadout) {
      responseEmbed.addFields({
        name: "Item",
        value: randomItem || "N/A",
      });
    }

    responseEmbed.addFields(
      {
        name: "Perks",
        value: randomPerks.join("\n"),
      },
      {
        name: "Add-ons",
        value: randomAddons.join("\n"),
      }
    );

    await interaction.reply({
      ephemeral: isPrivate,
      embeds: [responseEmbed],
    });
  },
};
