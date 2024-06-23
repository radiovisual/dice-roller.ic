import { Player } from "../../types";

export type ActionButtonsProps = {
  currentPlayer?: Player;
  onRollDiceClick: (player: Player) => void;
  onSkipTurnClick: (player: Player) => void;
};
