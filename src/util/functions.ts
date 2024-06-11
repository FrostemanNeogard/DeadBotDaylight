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

export async function fetchAddonData(ownerName: string, addonName: string) {
  if (!addonName) {
    return;
  }
  const apiUrl = BASE_API_URL + `addons/${ownerName}?name=${addonName}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const addon = data[0];
  return addon;
}
