import type { ActionButtonsProps } from "./types";
import { ActionButton } from "../action-button/action-button";

import styles from "./action-buttons.module.css";

export function ActionButtons(props: ActionButtonsProps) {
  const { onRollDiceClick, disabled } = props;

  return (
    <div className={styles.ActionButtons}>
      <ActionButton onClick={onRollDiceClick} disabled={disabled} />
    </div>
  );
}
