import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./dice-roller.module.css";
import { DiceRollerProps } from "./types";

const faces = {
  1: [0, 0, 0],
  2: [-90, 0, 0],
  3: [0, -90, 0],
  4: [0, 90, 0],
  5: [90, 0, 0],
  6: [180, 0, 0],
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const DiceRoller = (props: DiceRollerProps) => {
  const { force, onRollComplete } = props;

  const [rotation, setRotation] = useState([0, 0, 0]);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const baseDuration = 1;
  const baseRotations = 3;

  useEffect(() => {
    if (force !== undefined && force !== null) {
      rollDice(force);
    }
  }, [force]);

  const rollDice = (force: number) => {
    const randomSeed = seededRandom(force);
    const targetFace = Math.floor(randomSeed * 6) + 1;

    // Calculate extra rotations and duration based on force
    const extraRotations =
      baseRotations + Math.floor((force / 100) * (force * 1.2));
    const durationInSeconds = baseDuration + (force / 100) * 2;

    const randomRotation = [
      360 * extraRotations + faces[targetFace][0],
      360 * extraRotations + faces[targetFace][1],
      360 * extraRotations + faces[targetFace][2],
    ];

    setRotation(randomRotation);
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
      setResult(targetFace);
      onRollComplete(targetFace);
    }, durationInSeconds * 1000);
  };

  return (
    <div className={styles.diceContainer}>
      <motion.div
        className={styles.dice}
        animate={{
          rotateX: rotation[0],
          rotateY: rotation[1],
          rotateZ: rotation[2],
        }}
        transition={{
          duration: baseDuration + (force / 100) * 2,
          ease: "easeInOut",
        }}
      >
        <div className={`${styles.face} ${styles.front}`}>1</div>
        <div className={`${styles.face} ${styles.back}`}>6</div>
        <div className={`${styles.face} ${styles.left}`}>4</div>
        <div className={`${styles.face} ${styles.right}`}>3</div>
        <div className={`${styles.face} ${styles.top}`}>2</div>
        <div className={`${styles.face} ${styles.bottom}`}>5</div>
      </motion.div>

      <div className={styles.result}>
        You rolled a: <span className={styles.resultNumber}>{result}</span>
      </div>
    </div>
  );
};

export default DiceRoller;
