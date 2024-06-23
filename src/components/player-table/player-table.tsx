import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import type { PlayerTableProps } from "./types";

import styles from "./player-table.module.css";

export function PlayerTable(props: PlayerTableProps) {
  const { currentPlayer, players, onRemovePlayer, canDeletePlayers } = props;

  return (
    <div className={styles.playerTable}>
      {players.map((player, index) => {
        return (
          <div key={player.id} className={styles.tableRow}>
            {index + 1}{" "}
            <span className={styles.name} style={{ color: player.color }}>
              {player.name}
            </span>{" "}
            <span className={styles.yourTurn}>
              {currentPlayer.id === player.id ? "Your turn!" : null}
            </span>
            <div className={styles.buttonRow}>
              {canDeletePlayers ? (
                <Tooltip title={`Remove ${player.name}`} placement="top">
                  <IconButton
                    aria-label={`Remove ${player.name}`}
                    onClick={() => onRemovePlayer(player)}
                  >
                    <DeleteIcon fontSize="small" sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
