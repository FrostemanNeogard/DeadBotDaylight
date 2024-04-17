const needle = require("needle");
const cheerio = require("cheerio");
const fs = require("fs");

main();

async function main() {
  // const perkName = "A_Nurse's_Calling";
  // const formattedPerkName = formatPerkName(perkName);

  // const perkData = await fetchPerks(formattedPerkName);
  // console.log(perkData);

  const data = await fetchPerks();
  const jsonData = JSON.stringify(data, null, 2);
  const filePath = "data.json";
  fs.writeFileSync(filePath, jsonData);
}

function formatPerkName(unformattedPerkName) {
  const formattedPerkName = encodeURI(unformattedPerkName);
  return formattedPerkName;
}

async function fetchPerks() {
  const dbdUrl = "https://deadbydaylight.fandom.com/wiki/Perks";
  // const dbdUrl = `https://deadbydaylight.fandom.com/wiki/${perkName}?so=search`;
  console.log("Attempting to fetch data from:", dbdUrl);

  // Fetch RBNorway data
  const { body, statusCode } = await needle("get", dbdUrl);

  // Guard clause if fetch was unsuccessful
  if (!body || statusCode !== 200) {
    console.error("Couldn't fetch data.");
    return console.error(
      "An error occurred when fetching data. Please try again later."
    );
  }

  // RBNorway body
  const $ = cheerio.load(body, { decodeEntities: false });

  let data = [];

  const perksTable = $("tbody tr");
  perksTable.each(function () {
    const imageSrc = $(this).find("th:first a:first").attr("href");
    const name = $(this).find("th:nth-child(2) a:first").text();
    const info = $(this).find("td:first").text();
    const character = $(this).find("th:last a:first").text();
    data.push({
      name: name,
      image: imageSrc,
      info,
      character,
    });
  });

  return data;
}
