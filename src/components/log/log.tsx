import React from "react";

import type { LogProps } from "./types";

import styles from "./log.module.css";
import { LogItem } from "../log-item";

export function Log(props: LogProps) {
  const { logItems } = props;

  return (
    <div className={styles.Log}>
      <div className={styles.LogContent}>
        {logItems.map((logItem) => {
          return (
            <div key={logItem.id}>
              <LogItem gameAction={logItem} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
