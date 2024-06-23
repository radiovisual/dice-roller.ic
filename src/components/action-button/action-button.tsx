import React, { useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import type { ActionButtonProps } from "./types";

import styles from "./action-button.module.css";

export function ActionButton(props: ActionButtonProps) {
  const { onClick } = props;

  const [strength, setStrength] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const controls = useAnimation();
  const [isPressed, setIsPressed] = useState(false);

  const startGrowing = () => {
    setIsPressed(true);
    setStrength(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      setStrength((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return 100;
        }
        return prev + 1;
      });
    }, 10);

    controls.start({ width: "100%", transition: { duration: 1 } });
  };

  const stopGrowing = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    controls.start({ width: "0%", transition: { duration: 0.5 } });

    if (isPressed) {
      onClick(strength);
      setIsPressed(false);
    }

    setStrength(0);
  };

  return (
    <div className={styles.ActionButton}>
      <div>Strength: {strength}%</div>
      <motion.div
        initial={{ width: "0%" }}
        animate={controls}
        style={{
          height: 15,
          width: "100%",
          borderRadius: 0,
          backgroundColor: "#ff0eac",
          cursor: "pointer",
        }}
      />
      <button
        onMouseDown={startGrowing}
        onMouseUp={stopGrowing}
        onMouseLeave={stopGrowing}
        className={styles.rollBtn}
      >
        Roll the Dice!
      </button>
    </div>
  );
}
