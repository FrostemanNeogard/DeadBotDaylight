import { Perk } from "./perk";

export type Survivor = {
  name: string;
  description: string;
  perks: Perk[];
};
