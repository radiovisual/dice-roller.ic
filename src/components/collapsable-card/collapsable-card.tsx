import React from "react";

import type { CollapsableCardProps } from "./types";
import styles from "./collapsable-card.module.css";

export function CollapsableCard(props: CollapsableCardProps) {
  const { title, children } = props;

  return (
    <div className={styles.CollapsableCard}>
      <div className={styles.headerRow}>
        <span className={styles.title}>{title}</span>
        <div className={styles.buttonRow}> R + X</div>
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
