import React from "react";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { LogItem } from "./log-item";
import { Tooltip } from "@mui/material";
import type { PlayLogProps } from "./types";
import styles from "./play-log.module.css";

export function PlayLog(props: PlayLogProps) {
  const { logItems, onClearLogItems } = props;

  const clearLabel = "Clear play log";
  const clearLogButton = (
    <Tooltip title={clearLabel} placement="top">
      <IconButton
        size="small"
        aria-label={clearLabel}
        onClick={onClearLogItems}
      >
        <DeleteIcon fontSize="inherit" sx={{ color: "#fff" }} />
      </IconButton>
    </Tooltip>
  );

  return (
    <div className={styles.PlayLog}>
      <div className={styles.headerRow}>
        <span className={styles.title}>Play log</span>
        <div className={styles.buttonRow}>{clearLogButton}</div>
      </div>

      <div className={styles.content}>
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
      </div>
    </div>
  );
}
