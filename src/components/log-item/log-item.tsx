import React, { ReactNode } from "react";
import { format } from "date-fns";

import type { LogItemProps } from "./types";

import styles from "./log-item.module.css";

import { ACTION_TYPE } from "../../constants";

export function LogItem(props: LogItemProps) {
  const { gameAction } = props;
  const { playerInitated } = gameAction;

  const playerName = playerInitated ? playerInitated.name : "";
  const playerColor = playerInitated ? playerInitated.color : "#fff";
  const value = gameAction.value ?? "";

  let message: ReactNode;

  if (gameAction.type === ACTION_TYPE.ROLL_COMPLETED) {
    message = (
      <span style={{ color: playerColor }}>
        {playerName} rolled a {value}
      </span>
    );
  } else if (gameAction.type === ACTION_TYPE.ROLL_START) {
    message = <span>{playerName} started a roll</span>;
  } else if (gameAction.type === ACTION_TYPE.ROLL_SKIP) {
    message = <span className={styles.red}>{playerName} was skipped</span>;
  } else if (gameAction.type === ACTION_TYPE.PLAYER_REMOVED) {
    message = <span className={styles.red}>{playerName} was removed</span>;
  } else if (gameAction.type === ACTION_TYPE.MESSAGE || value) {
    message = <span style={{ color: playerColor }}>{value}</span>;
  }

  if (!message) {
    return;
  }

  return (
    <div className={styles.logItem}>
      <span className={styles.date}>
        {format(gameAction.date, "HH:mm:ss")} |{" "}
      </span>
      {message}
    </div>
  );
}
