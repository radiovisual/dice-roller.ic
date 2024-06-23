import { PLAY_MODE, ACTION_TYPE } from "../constants";
import { GameAction, Player } from "../types";
import { nanoid } from "nanoid";
import { EventEmitter, type EventCallback } from "./event-emitter";

const noop = () => {};

export class GameEngine {
  private players: Player[];
  private currentPlayerIndex = 0;
  private rollCount = 0;
  private skipCount = 0;
  private playMode: string;
  private actionStack: GameAction[] = [];
  private isRolling: boolean;
  private actionCallback: (gameActions: GameAction[]) => void;
  private eventEmitter: EventEmitter;

  constructor(
    currentPlayer: Player,
    players: Player[],
    playMode = PLAY_MODE.FORWARD_MULTI_PLAYER,
    actionCallback = noop
  ) {
    this.players = players;
    this.playMode = playMode;
    this.isRolling = false;
    this.actionCallback = actionCallback;
    this.setCurrentPlayer(currentPlayer);
    this.eventEmitter = new EventEmitter();
  }

  on(event: string, callback: EventCallback) {
    this.eventEmitter.on(event, callback);
  }

  off(event: string, callback: EventCallback) {
    this.eventEmitter.off(event, callback);
  }

  dispatchAction(action: GameAction) {
    console.log("dispatching action", action.type);
    this.actionStack.unshift(action);

    if (typeof this.actionCallback === "function") {
      this.actionCallback(this.actionStack);
    }

    this.eventEmitter.emit(ACTION_TYPE.DISPATCH_ACTION, action);
  }

  startRoll(player: Player) {
    console.log("startRoll", player.name);
    this.isRolling = true;

    this.dispatchAction({
      id: nanoid(),
      date: new Date(),
      type: ACTION_TYPE.ROLL_START,
      playerInitated: player,
    });
    this.logStatus();

    // TEMPORARY FAKE ROLLER MECHANISM
    // TODO: Replace this with a cool threejs dice simulation
    setTimeout(() => {
      this.rollComplete(2, player);
    }, 1000);
  }

  cancelRoll() {
    this.isRolling = false;
  }

  rollComplete(value: number[] | number, player: Player) {
    console.log("rollComplete", player.name);
    this.isRolling = false;
    this.rollCount += 1;
    this.advanceToNextPlayer();

    this.dispatchAction({
      id: nanoid(),
      date: new Date(),
      value,
      type: ACTION_TYPE.ROLL_COMPLETED,
      playerInitated: player,
    });

    this.eventEmitter.emit(ACTION_TYPE.ROLL_COMPLETED, this.getCurrentPlayer());
    this.logStatus();
  }

  getIsRolling() {
    return this.isRolling;
  }

  skip(player: Player) {
    this.cancelRoll();

    this.dispatchAction({
      id: nanoid(),
      date: new Date(),
      type: ACTION_TYPE.ROLL_SKIP,
      playerInitated: player,
    });

    this.advanceToNextPlayer();
    this.skipCount += 1;

    this.eventEmitter.emit(ACTION_TYPE.ROLL_SKIP, this.getCurrentPlayer());
  }

  reset() {
    // TODO log the reset
    this.currentPlayerIndex = 0;
    this.skipCount = 0;
    this.rollCount = 0;
    this.eventEmitter.emit(ACTION_TYPE.RESET_GAME);
  }

  addPlayer(player: Player) {
    this.players.push(player);
    this.eventEmitter.emit(ACTION_TYPE.PLAYER_ADDED, player);
  }

  removePlayer(playerToRemove: Player) {
    const playerIndexToRemove = this.players.findIndex(
      (player) => player.id === playerToRemove.id
    );

    if (playerIndexToRemove === -1) {
      // Player not found
      return;
    }

    // Remove the player from the list
    this.players = this.players.toSpliced(playerIndexToRemove, 1);

    // Adjust the playerIndex if necessary
    if (this.players.length === 0) {
      this.currentPlayerIndex = 0;
    } else if (playerIndexToRemove < this.currentPlayerIndex) {
      this.currentPlayerIndex -= 1;
    } else if (playerIndexToRemove === this.currentPlayerIndex) {
      // If the removed player is the current player, set the current player to the new index
      this.currentPlayerIndex = this.currentPlayerIndex % this.players.length;
    }

    // Ensure playerIndex is within bounds
    if (this.currentPlayerIndex >= this.players.length) {
      this.currentPlayerIndex = 0;
    }

    this.dispatchAction({
      id: nanoid(),
      date: new Date(),
      type: ACTION_TYPE.PLAYER_REMOVED,
      playerInitated: playerToRemove,
    });

    this.eventEmitter.emit(ACTION_TYPE.PLAYER_REMOVED, playerToRemove);
    this.logStatus();
  }

  logStatus() {
    console.log({
      players: this.players,
      currentPlayerIndex: this.currentPlayerIndex,
      isRolling: this.isRolling,
    });
  }

  getPlayers() {
    return this.players;
  }

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  setCurrentPlayer(player: Player) {
    const index = this.players.findIndex((p) => p.id === player.id);
    if (index !== -1) {
      this.currentPlayerIndex = index;
    }
  }

  getNextPlayerIndex(): number {
    if (
      this.players.length === 1 ||
      this.playMode === PLAY_MODE.SINGLE_PLAYER
    ) {
      return this.currentPlayerIndex;
    } else if (this.playMode === PLAY_MODE.FORWARD_MULTI_PLAYER) {
      return (this.currentPlayerIndex + 1) % this.players.length;
    } else if (this.playMode === PLAY_MODE.REVERSE_MULTI_PLAYER) {
      return (
        (this.currentPlayerIndex - 1 + this.players.length) %
        this.players.length
      );
    }

    return this.currentPlayerIndex;
  }

  advanceToNextPlayer() {
    this.currentPlayerIndex = this.getNextPlayerIndex();
    this.eventEmitter.emit(
      ACTION_TYPE.ADDVANCE_TO_NEW_PLAYER,
      this.getCurrentPlayer()
    );
  }

  registerActionCallback(callback: (gameAction: GameAction[]) => void) {
    this.actionCallback = callback;
  }
}
