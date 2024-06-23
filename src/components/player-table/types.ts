import { Player } from "../../types";

export type PlayerTableProps = {
  players: Player[];
  currentPlayer: Player;
  onRemovePlayer: (player: Player) => void;
  canDeletePlayers: boolean;
};
