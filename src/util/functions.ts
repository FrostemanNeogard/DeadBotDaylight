import { Addon } from "../__types/addon";
import { Killer } from "../__types/killer";
import { Perk } from "../__types/perk";

const { BASE_API_URL } = process.env;

export async function fetchPerkData(perkName: string): Promise<Perk | void> {
  if (!perkName) {
    return;
  }
  const apiUrl = BASE_API_URL + `perks?name=${perkName}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const perk = data[0];
  return perk;
}

export async function fetchAddonData(
  ownerName: string,
  addonName: string
): Promise<Addon | void> {
  if (!addonName) {
    return;
  }
  const apiUrl = BASE_API_URL + `addons/${ownerName}?name=${addonName}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const addon = data[0];
  return addon;
}

export async function fetchRandomKiller(): Promise<Killer | void> {
  const apiUrl = BASE_API_URL + "killers/random";
  const response = await fetch(apiUrl);
  const data = await response.json();
  const killer = data[0];
  if (!killer) {
    return;
  }
  return killer;
}
