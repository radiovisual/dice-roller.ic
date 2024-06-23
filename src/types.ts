export type LogItem = {
  id: string;
  date: string;
  text: string;
  subtext: string;
};

export type GameAction = {
  type: string;
  value?: string | number | number[] | object;
};
