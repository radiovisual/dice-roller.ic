import { Player } from "../../types";

export type ActionButtonsProps = {
  currentPlayer: Player;
  onRollDiceClick: () => void;
  onSkipTurnClick: () => void;
};
