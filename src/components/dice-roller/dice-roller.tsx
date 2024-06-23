import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import styles from "./dice-roller.module.css";
import { DiceRollerProps } from "./types";

type Faces = {
  [key: number]: number[];
};

const faces: Faces = {
  1: [10, 10, 0],
  2: [-80, 10, 0],
  3: [10, -80, 0],
  4: [10, 80, 0],
  5: [100, 10, 0],
  6: [190, 10, 0],
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const DiceRoller = (props: DiceRollerProps) => {
  const { force, onRollComplete } = props;

  const [rotation, setRotation] = useState([0, 0, 0]);
  const [result, setResult] = useState<number | null>(null);

  const baseDuration = 1;
  const baseRotations = 3;

  const rollDice = useCallback(
    (force: number) => {
      const randomSeed = seededRandom(force);
      const targetFace = Math.floor(randomSeed * 6) + 1;

      // Calculate extra rotations and duration based on force
      const extraRotations =
        baseRotations + Math.floor((force / 100) * (force * 0.7));
      const durationInSeconds = baseDuration + (force / 100) * 1.2;

      const randomRotation = [
        360 * extraRotations + faces[targetFace][0],
        360 * extraRotations + faces[targetFace][1],
        360 * extraRotations + faces[targetFace][2],
      ];

      setRotation(randomRotation);

      setTimeout(() => {
        setResult(targetFace);
        onRollComplete(targetFace);
      }, durationInSeconds * 1000);
    },
    [onRollComplete]
  );

  useEffect(() => {
    if (force) {
      rollDice(force);
    }
  }, [force, rollDice]);

  return (
    <div className={styles.diceContainer}>
      <div className={styles.dicePerspective}>
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
      </div>
      <div className={styles.result}>
        You rolled a: <span className={styles.resultNumber}>{result}</span>
      </div>
    </div>
  );
};

export default DiceRoller;
