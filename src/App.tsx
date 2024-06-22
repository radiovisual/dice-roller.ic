import { useEffect, useState } from "react";
import pkg from "../package.json";
import { PlayerTable } from "./components/player-table";
import { Log } from "./components/log";
import type { Player, LogItem } from "./types";
import { GameEngine } from "./classes/game-engine";

import "./App.css";

import { CollapsableCard } from "./components/collapsable-card";
import { ActionButtons } from "./components/action-buttons";
import { getDefaultPlayers } from "./utils/player.utils";

const defaultPlayers = getDefaultPlayers();

const gameEngine = new GameEngine(defaultPlayers[0], defaultPlayers);

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(defaultPlayers[0]);
  const [logItems, setLogItems] = useState<LogItem[]>([]);
  const [players, setPlayers] = useState<Player[]>(defaultPlayers);

  useEffect(() => {
    gameEngine.registerActionCallback(setLogItems);
  }, []);

  const handleRollDiceClick = () => {
    gameEngine.startRoll(currentPlayer);
    setCurrentPlayer(gameEngine.getCurrentPlayer());
  };

  const handleSkipTurnClick = () => {
    gameEngine.skip(currentPlayer);
    setCurrentPlayer(gameEngine.getCurrentPlayer());
  };

  return (
    <>
      <div className="Header">
        Dice Roller 🎲 <code>v{pkg.version}</code>
      </div>

      <div className="DiceRoller"></div>

      <ActionButtons
        currentPlayer={currentPlayer}
        onRollDiceClick={handleRollDiceClick}
        onSkipTurnClick={handleSkipTurnClick}
      />

      <div className="CollapsableCards">
        <CollapsableCard
          title="Player rotation"
          buttonRow={[
            <button>R</button>,
            <button>+</button>,
            <button>X</button>,
          ]}
        >
          <PlayerTable players={players} currentPlayer={currentPlayer} />
        </CollapsableCard>

        <CollapsableCard
          title="Play log"
          buttonRow={[<button>C</button>, <button>X</button>]}
        >
          <Log logItems={logItems} />
        </CollapsableCard>
      </div>
    </>
  );
}

export default App;
