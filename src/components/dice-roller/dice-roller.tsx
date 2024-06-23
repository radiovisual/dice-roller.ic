import React, { useState } from "react";
import { motion } from "framer-motion";

import styles from "./dice-roller.module.css";

export const DiceRoller = () => {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState(null);

  const rollDice = () => {
    const randomRotation = [
      Math.random() * 360,
      Math.random() * 360,
      Math.random() * 360,
    ];
    setRotation(randomRotation);
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
      determineResult(randomRotation);
    }, 2000); // Assuming the animation takes 2 seconds
  };

  const determineResult = (rotation) => {
    const [x, y, z] = rotation;
    // Simplified logic to determine the result based on rotation
    const normalizedX = x % 360;
    const normalizedY = y % 360;
    const normalizedZ = z % 360;

    // Determine result based on which face is closest to the "front"
    let face = 1; // Default to 1
    if (normalizedX < 90 || normalizedX > 270) {
      face = 1;
    } else if (normalizedX >= 90 && normalizedX < 270) {
      face = 6;
    }

    if (normalizedY >= 45 && normalizedY < 135) {
      face = 2;
    } else if (normalizedY >= 135 && normalizedY < 225) {
      face = 5;
    } else if (normalizedY >= 225 && normalizedY < 315) {
      face = 4;
    }

    if (normalizedZ >= 45 && normalizedZ < 135) {
      face = 3;
    } else if (normalizedZ >= 135 && normalizedZ < 225) {
      face = 2;
    } else if (normalizedZ >= 225 && normalizedZ < 315) {
      face = 4;
    }

    setResult(face);
  };

  return (
    <div className={styles.diceContainer}>
      <div>
        <motion.div
          className="dice"
          animate={{
            rotateX: rotation[0],
            rotateY: rotation[1],
            rotateZ: rotation[2],
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <div className={`${styles.face} ${styles.front}`}>1</div>
          <div className={`${styles.face} ${styles.back}`}>6</div>
          <div className={`${styles.face} ${styles.left}`}>4</div>
          <div className={`${styles.face} ${styles.right}`}>3</div>
          <div className={`${styles.face} ${styles.top}`}>2</div>
          <div className={`${styles.face} ${styles.bottom}`}>5</div>
        </motion.div>
      </div>
      <button onClick={rollDice} disabled={rolling}>
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>
      {result && <div>Result: {result}</div>}
      <style jsx>{`
        .dice-container {
          perspective: 1000px;
        }
        .dice {
          width: 100px;
          height: 100px;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        }
        .face {
          position: absolute;
          width: 100px;
          height: 100px;
          background: white;
          border: 1px solid #000;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
        }
        .front {
          transform: rotateY(0deg) translateZ(50px);
        }
        .back {
          transform: rotateY(180deg) translateZ(50px);
        }
        .right {
          transform: rotateY(90deg) translateZ(50px);
        }
        .left {
          transform: rotateY(-90deg) translateZ(50px);
        }
        .top {
          transform: rotateX(90deg) translateZ(50px);
        }
        .bottom {
          transform: rotateX(-90deg) translateZ(50px);
        }
      `}</style>
    </div>
  );
};

export default DiceRoller;
