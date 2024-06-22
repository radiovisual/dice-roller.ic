import { colorChoices } from "../constants";
import { Player } from "../types";
import { nanoid } from "nanoid";

const defaultPlayer1: Player = {
  order: 0,
  id: nanoid(),
  name: "Player One",
  color: colorChoices[0],
};

const defaultPlayer2: Player = {
  id: nanoid(),
  order: 1,
  name: "Player Two",
  color: colorChoices[1],
};

const defaultPlayer3: Player = {
  id: nanoid(),
  order: 2,
  name: "Player Three",
  color: colorChoices[2],
};

const defaultPlayer4: Player = {
  id: nanoid(),
  order: 3,
  name: "Player Four",
  color: colorChoices[3],
};

export function getDefaultPlayers(): Player[] {
  return [defaultPlayer1, defaultPlayer2, defaultPlayer3, defaultPlayer4];
}
