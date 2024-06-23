import React from "react";

import type { ActionButtonsProps } from "./types";
import { ActionButton } from "../action-button/action-button";

import styles from "./action-buttons.module.css";

export function ActionButtons(props: ActionButtonsProps) {
  const { currentPlayer, onRollDiceClick, onSkipTurnClick } = props;

  return (
    <div className={styles.ActionButtons}>
      <span className={styles.name}>{currentPlayer?.name ?? ""}</span>
      <ActionButton
        variant="primary"
        label={"Roll the dice"}
        onClick={() => onRollDiceClick(currentPlayer)}
      />
      <ActionButton
        variant="secondary"
        label={"Skip your turn"}
        onClick={() => onSkipTurnClick(currentPlayer)}
      />
    </div>
  );
}
