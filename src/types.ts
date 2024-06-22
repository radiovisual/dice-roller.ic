export type Player = {
  id: string;
  name: string;
  color: string;
  order: number;
};

export type LogItem = {
  id: string;
  date: string;
  text: string;
  subtext: string;
  playerInitiated?: Player;
};

export type GameAction = {
  id: string;
  type: string;
  date: Date;
  value?: string | number | number[];
  playerInitated?: Player;
};
