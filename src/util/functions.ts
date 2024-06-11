import { Addon } from "../__types/addon";
import { Item } from "../__types/item";
import { Killer } from "../__types/killer";
import { Offering } from "../__types/offering";
import { Perk } from "../__types/perk";
import { Survivor } from "../__types/survivor";

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

export async function fetchRandomKillers(): Promise<Killer[] | void> {
  const apiUrl = BASE_API_URL + "killers/random";
  const response = await fetch(apiUrl);
  const data = await response.json();
  const killer = data[0];
  if (!killer) {
    return;
  }
  return killer;
}

export async function fetchRandomSurvivors(): Promise<Survivor[] | void> {
  const apiUrl = BASE_API_URL + "survivors/random";
  const response = await fetch(apiUrl);
  const data: Survivor[] = await response.json();
  if (data?.length <= 0) {
    return;
  }
  return data;
}

export async function fetchRandomAddons(
  ownerName: string
): Promise<Addon[] | void> {
  const apiUrl = BASE_API_URL + `addons/${ownerName}/random`;
  const response = await fetch(apiUrl);
  const data: Addon[] = await response.json();
  if (data?.length <= 0) {
    return;
  }
  return data;
}

export async function fetchRandomOfferings(
  isKiller: boolean
): Promise<Offering[] | void> {
  const apiUrl =
    BASE_API_URL + `offerings/random?role=${isKiller ? "killer" : "survivor"}`;
  const response = await fetch(apiUrl);
  const data: Offering[] = await response.json();
  if (data?.length <= 0) {
    return;
  }
  return data;
}

export async function fetchRandomItem(): Promise<Item[] | void> {
  const apiUrl = BASE_API_URL + `items/random`;
  const response = await fetch(apiUrl);
  const data: Item[] = await response.json();
  if (data?.length <= 0) {
    return;
  }
  return data;
}

export async function fetchRandomPerks(
  isKiller: boolean
): Promise<Perk[] | void> {
  const apiUrl =
    BASE_API_URL + `perks/random?role=${isKiller ? "killer" : "survivor"}`;
  const response = await fetch(apiUrl);
  const data: Perk[] = await response.json();
  if (data?.length <= 0) {
    return;
  }
  return data;
}
