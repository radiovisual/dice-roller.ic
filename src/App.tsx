import { useEffect, useState } from "react";
import pkg from "../package.json";
import { PlayerTable } from "./components/player-table";
import { Log } from "./components/log";
import type { Player, GameAction } from "./types";
import { GameEngine } from "./classes/game-engine";

import "./App.css";

import { CollapsableCard } from "./components/collapsable-card";
import { ActionButtons } from "./components/action-buttons";
import { getDefaultPlayers } from "./utils/player.utils";
import { ACTION_TYPE } from "./constants";
import { EventCallback, EventData } from "./classes/event-emitter";

const defaultPlayers = getDefaultPlayers();

const gameEngine = new GameEngine(defaultPlayers[0], defaultPlayers);

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(defaultPlayers[0]);
  const [logItems, setLogItems] = useState<GameAction[]>([]);
  const [players, setPlayers] = useState<Player[]>(defaultPlayers);

  useEffect(() => {
    console.log("mounting app and registering listener");
    gameEngine.registerActionCallback(setLogItems);

    const handlePlayerChange: EventCallback = (data: EventData) => {
      if (data) {
        setCurrentPlayer(data as Player);
      }
    };

    const handlePlayerListChange = () => {
      setPlayers(gameEngine.getPlayers());
    };

    gameEngine.on(ACTION_TYPE.ROLL_COMPLETED, handlePlayerChange);
    gameEngine.on(ACTION_TYPE.ROLL_SKIP, handlePlayerChange);
    gameEngine.on(ACTION_TYPE.PLAYER_REMOVED, handlePlayerListChange);
    gameEngine.on(ACTION_TYPE.ADDVANCE_TO_NEW_PLAYER, handlePlayerChange);

    return () => {
      gameEngine.off(ACTION_TYPE.ROLL_COMPLETED, handlePlayerChange);
      gameEngine.off(ACTION_TYPE.ROLL_SKIP, handlePlayerChange);
      gameEngine.off(ACTION_TYPE.PLAYER_REMOVED, handlePlayerListChange);
      gameEngine.off(ACTION_TYPE.ADDVANCE_TO_NEW_PLAYER, handlePlayerChange);
    };
  }, []);

  const handleRollDiceClick = () => {
    gameEngine.startRoll(currentPlayer);
  };

  const handleSkipTurnClick = (player: Player) => {
    gameEngine.skip(player);
  };

  const handleRemovePlayer = (player: Player) => {
    gameEngine.removePlayer(player);
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
          buttonRow={[<button>+</button>, <button>X</button>]}
        >
          <PlayerTable
            players={players}
            currentPlayer={currentPlayer}
            onRemovePlayer={handleRemovePlayer}
            canDeletePlayers={players.length > 1}
          />
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
