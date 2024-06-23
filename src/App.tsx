import { useEffect, useState } from "react";
import { GameEngine } from "./classes/game-engine";
import { PlayLog } from "./components/play-log";
import { ActionButton } from "./components/action-button";
import { ACTION_TYPE } from "./constants";
import { EventData } from "./classes/event-emitter";
import { DiceRoller } from "./components/dice-roller";
import { Header } from "./components/header";

import "./App.css";

const gameEngine = new GameEngine();

function App() {
  const [logItems, setLogItems] = useState<EventData[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [force, setForce] = useState(0);

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
    if (!isRolling) {
      setForce(rollStength);
      gameEngine.startRoll(rollStength);
    }
  };

  const handleClearPlayLog = () => {
    gameEngine.clearEventData();
    setLogItems([]);
  };

  const handleDiceThrowCompleted = (result: number) => {
    gameEngine.rollComplete(result);
    setIsRolling(false);
  };

  return (
    <>
      <Header />
      <DiceRoller force={force} onRollComplete={handleDiceThrowCompleted} />
      <div className="ActionRow">
        <div className="CollapsableCards">
          <div className="ActionButtons">
            <div>
              <ActionButton
                onClick={handleRollDiceClick}
                disabled={isRolling}
              />
            </div>
          </div>
          <PlayLog logItems={logItems} onClearLogItems={handleClearPlayLog} />
        </div>
      </div>
    </>
  );
}

export default App;
