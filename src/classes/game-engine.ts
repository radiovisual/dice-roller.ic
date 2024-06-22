import { PLAY_MODE, ACTION_TYPE } from "../constants";
import { GameAction, Player } from "../types";
import { nanoid } from "nanoid";

const noop = () => {};

export class GameEngine {
  private currentPlayer: Player;
  private players: Player[];
  private playerIndex = 0;
  private rollCount = 0;
  private skipCount = 0;
  private playMode: string;
  private actionStack: GameAction[] = [];
  private isRolling: boolean;
  private actionCallback: (gameActions: GameAction[]) => void;

  constructor(
    currentPlayer: Player,
    players: Player[],
    playMode = PLAY_MODE.FORWARD_MULTI_PLAYER,
    actionCallback = noop
  ) {
    this.currentPlayer = currentPlayer;
    this.players = players;
    this.playMode = playMode;
    this.isRolling = false;
    this.actionCallback = actionCallback;
  }

  dispatchAction(action: GameAction) {
    this.actionStack.unshift(action);

    if (typeof this.actionCallback === "function") {
      this.actionCallback(this.actionStack);
    }
  }

  startRoll(currentPlayer: Player) {
    this.isRolling = true;
    // TODO log the roll
    this.dispatchAction({
      id: nanoid(),
      date: new Date(),
      type: ACTION_TYPE.ROLL_START,
      playerInitated: currentPlayer,
    });

    // TEMPORARY FAKE ROLLER MECHANISM
    // TODO: Replace this with a cool threejs dice simulation
    this.rollComplete(2, currentPlayer), 200;
  }

  cancelRoll() {
    this.isRolling = false;
  }

  rollComplete(value: number[] | number, playerInitated: Player) {
    this.isRolling = false;
    this.rollCount += 1;
    this.advanceToNextPlayer();
    this.dispatchAction({
      id: nanoid(),
      date: new Date(),
      value,
      type: ACTION_TYPE.ROLL_COMPLETED,
      playerInitated,
    });
  }

  getIsRolling() {
    return this.isRolling;
  }

  skip(currentPlayer: Player) {
    this.cancelRoll();
    // TODO log the skip
    this.dispatchAction({
      id: nanoid(),
      date: new Date(),
      type: ACTION_TYPE.ROLL_SKIP,
      playerInitated: currentPlayer,
    });
    this.advanceToNextPlayer();
    this.skipCount += 1;
  }

  reset() {
    // TODO log the reset
    this.playerIndex = 0;
    this.skipCount = 0;
    this.rollCount = 0;
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  removePlayer(playerToRemove: Player) {
    this.players = this.players.filter(
      (player) => playerToRemove.id !== player.id
    );
  }

  getCurrentPlayer(): Player {
    return this.currentPlayer;
  }

  getNextPlayerIndex(): number {
    if (this.playMode === PLAY_MODE.FORWARD_MULTI_PLAYER) {
      if (this.playerIndex + 2 > this.players.length) {
        return 0;
      }
      return this.playerIndex + 1;
    } else if (this.playMode === PLAY_MODE.REVERSE_MULTI_PLAYER) {
      if (this.playerIndex - 1 < 0) {
        return this.players.length - 1;
      }
      return this.playerIndex - 1;
    }
    // Player index does not change in PLAY_MODE.SINGLE_PLAYER
    return this.playerIndex;
  }

  advanceToNextPlayer() {
    const nextPlayerIndex = this.getNextPlayerIndex();
    this.playerIndex = nextPlayerIndex;

    console.log("playerIndex", this.playerIndex);

    this.currentPlayer = this.players[nextPlayerIndex];
  }

  registerActionCallback(callback: (gameAction: GameAction[]) => void) {
    this.actionCallback = callback;
  }
}
