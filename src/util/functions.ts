const { BASE_API_URL } = process.env;

export async function fetchPerkData(perkName: string) {
  if (!perkName) {
    return;
  }
  const apiUrl = BASE_API_URL + `perks?name=${perkName}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const perk = data[0];
  return perk;
}
