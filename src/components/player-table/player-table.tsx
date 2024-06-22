import React from "react";

import type { PlayerTableProps } from "./types";

import styles from "./player-table.module.css";

export function PlayerTable(props: PlayerTableProps) {
  const { currentPlayer, players } = props;

  return (
    <div className={styles.PlayerTable}>
      {players.map((player, index) => {
        return (
          <div key={player.id} className={styles.TableRow}>
            {index + 1}{" "}
            <span style={{ color: player.color }}>{player.name}</span>{" "}
            {currentPlayer.id === player.id ? (
              <span className={styles.yourTurn}>your turn!</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
