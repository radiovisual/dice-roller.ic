import React, { ReactNode } from "react";
import { format } from "date-fns";

import type { LogItemProps } from "./types";

import styles from "./log-item.module.css";

import { ACTION_TYPE } from "../../../constants";

export function LogItem(props: LogItemProps) {
  const { gameAction } = props;

  const value = gameAction.value ?? "";

  let message: ReactNode;

  if (gameAction.type === ACTION_TYPE.ROLL_COMPLETED) {
    message = <span>You rolled a {value}</span>;
  } else if (gameAction.type === ACTION_TYPE.ROLL_START) {
    message = <span>A roll was started</span>;
  } else if (gameAction.type === ACTION_TYPE.MESSAGE || value) {
    message = <span>{value}</span>;
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
