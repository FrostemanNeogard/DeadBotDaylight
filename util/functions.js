const fs = require("fs");
const addonData = require("../data/addons.json");
const perkData = require("../data/perks.json");
const fetch = require("node-fetch");
require("dotenv").config();
const BASE_API_URL = process.env.BASE_API_URL;

const getFiles = (path, ending) => {
  return fs.readdirSync(path).filter((f) => f.endsWith(ending));
};

const capitalizeFirstLetters = (string) => {
  const words = string.split(" ");
  const output = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const capitalizedWord = word[0].toUpperCase() + word.substring(1);
    output.push(capitalizedWord);
  }
  return output.join(" ");
};

const fetchKillerNames = () => {
  const killerNames = addonData.map((item) => {
    return { name: item.name, value: item.name };
  });
  return killerNames;
};

const ADDON_QUALITIES = {
  0: "Unknown",
  1: "Common",
  2: "Uncommon",
  3: "Rare",
  4: "Very rare",
  5: "Iridescent",
};

function defaultTextFormatter(unformattedInput) {
  let formattedInput = unformattedInput;
  formattedInput = formattedInput.toLowerCase();
  formattedInput = formattedInput.replaceAll("-", "");
  formattedInput = formattedInput.replaceAll("the ", "");
  formattedInput = formattedInput.replaceAll("_", "");
  formattedInput = formattedInput.replaceAll(",", "");
  formattedInput = formattedInput.replaceAll(".", "");
  formattedInput = formattedInput.replaceAll("'", "");
  formattedInput = formattedInput.replaceAll(" ", "");
  formattedInput = formattedInput.replaceAll("  ", "");
  formattedInput = formattedInput.replaceAll(":", "");
  return formattedInput;
}

function fetchAddonData(ownerName, addonName) {
  const allAddons = addonData.filter(
    (item) =>
      defaultTextFormatter(item.name) === defaultTextFormatter(killerName)
  );
  if (allAddons.length <= 0) {
    return;
  }
  const addon = allAddons[0].addons.filter(
    (item) =>
      defaultTextFormatter(item.name) === defaultTextFormatter(addonName)
  )[0];
  return addon;
}

function getRandomPerks(isKiller) {
  const killerPerks = perkData.killer;
  const survivorPerks = perkData.survivor;
  let perkName = "";
  let perks = [];
  if (isKiller) {
    for (let i = 0; i < 4; i++) {
      let randomIndex = Math.floor(Math.random() * killerPerks.length);
      perkName = killerPerks[randomIndex].name;
      perks.push(perkName);
      killerPerks.splice(randomIndex, 1);
    }
  } else {
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * survivorPerks.length);
      const perk = survivorPerks[randomIndex];
      if (!perk.name) {
        return;
      }
      const perkName = perk.name;
      perks.push(perkName);
      survivorPerks.splice(randomIndex, 1);
    }
  }
  return perks;
}

function getRandomItem() {
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
  const randomIndex = Math.floor(Math.random() * items.length);
  const randomItem = items[randomIndex];
  return randomItem;
}

function getRandomOffering() {
  let offerings = ["Brown", "Yellow", "Green", "Purple"];
  const randomIndex = Math.floor(Math.random() * offerings.length);
  const randomOffering = offerings[randomIndex];
  return randomOffering;
}

function getRandomSurvivor() {
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
    "Kate Denson",
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
  const randomSurvivor = survivors[randomIndex];
  return randomSurvivor;
}

async function getRandomAddons(ownerName) {
  const apiUrl = BASE_API_URL + `addons/${ownerName}/random`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const addonNames = data.map((addon) => addon.name);
  return addonNames;
}

async function getRandomKiller() {
  const apiUrl = BASE_API_URL + "killers/random";
  const response = await fetch(apiUrl);
  const data = await response.json();
  const killerName = data[0].name;
  return killerName;
}

module.exports = {
  getFiles,
  capitalizeFirstLetters,
  ADDON_QUALITIES,
  defaultTextFormatter,
  fetchKillerNames,
  fetchAddonData,
  getRandomPerks,
  getRandomItem,
  getRandomOffering,
  getRandomSurvivor,
  getRandomAddons,
  getRandomKiller,
};
