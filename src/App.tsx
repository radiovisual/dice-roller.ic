import { useEffect, useState } from "react";

import { GameEngine } from "./classes/game-engine";
import { PlayLog } from "./components/play-log";
import { ActionButtons } from "./components/action-buttons";
import { ACTION_TYPE } from "./constants";
import { EventData } from "./classes/event-emitter";
import pkg from "../package.json";

import "./App.css";
import { DiceRoller } from "./components/dice-roller";

const gameEngine = new GameEngine();

function App() {
  const [logItems, setLogItems] = useState<EventData[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const handleUpdateLogItems = () => {
    setLogItems(gameEngine.getGameEvents());
  };

  const handleRollStart = () => {
    setIsRolling(true);
  };

  const handleRollComplete = () => {
    setIsRolling(false);
  };

  useEffect(() => {
    console.log("mounting app and registering listener");

    gameEngine.on(ACTION_TYPE.ROLL_START, handleRollStart);
    gameEngine.on(ACTION_TYPE.ROLL_START, handleUpdateLogItems);
    gameEngine.on(ACTION_TYPE.ROLL_COMPLETED, handleUpdateLogItems);
    gameEngine.on(ACTION_TYPE.ROLL_COMPLETED, handleRollComplete);

    return () => {
      gameEngine.off(ACTION_TYPE.ROLL_START, handleRollStart);
      gameEngine.off(ACTION_TYPE.ROLL_START, handleUpdateLogItems);
      gameEngine.off(ACTION_TYPE.ROLL_COMPLETED, handleUpdateLogItems);
      gameEngine.off(ACTION_TYPE.ROLL_COMPLETED, handleRollComplete);
    };
  }, []);

  const handleRollDiceClick = (rollStength: number) => {
    console.log("Roll with strengh", rollStength);
    gameEngine.startRoll(rollStength);
  };

  const handleClearPlayLog = () => {
    gameEngine.clearEventData();
    setLogItems([]);
  };

  const handleDiceThrowCompleted = () => {
    console.log("handleDiceThrowCompleted");
  };

  return (
    <>
      <div className="Header">
        Dice Roller 🎲 <code>v{pkg.version}</code>
      </div>

      <DiceRoller />
      <div>
        <h3>Final Results</h3>
      </div>

      <div className="ActionRow">
        <div className="CollapsableCards">
          <div className="ActionButtons">
            <ActionButtons onRollDiceClick={handleRollDiceClick} />
          </div>

          <PlayLog logItems={logItems} onClearLogItems={handleClearPlayLog} />
        </div>
      </div>
    </>
  );
}

export default App;
