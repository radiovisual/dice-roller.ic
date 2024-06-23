import { nanoid } from "nanoid";
import { ACTION_TYPE } from "../constants";
import { GameAction } from "../types";
import { EventData, EventEmitter, type EventCallback } from "./event-emitter";

export class GameEngine {
  private totalRollCount = 0;
  private rollStats: { [key: number]: number } = {};
  private isRolling: boolean;
  private gameEvents: EventData[];
  private eventEmitter: EventEmitter;

  constructor() {
    this.gameEvents = [];
    this.isRolling = false;
    this.eventEmitter = new EventEmitter();
  }

  on(event: string, callback: EventCallback) {
    this.eventEmitter.on(event, callback);
  }

  off(event: string, callback: EventCallback) {
    this.eventEmitter.off(event, callback);
  }

  dispatchAction(action: GameAction) {
    const eventData = {
      id: nanoid(),
      date: new Date(),
      ...action,
    } as EventData;
    this.gameEvents.unshift(eventData);
    this.eventEmitter.emit(action.type, eventData);
  }

  getGameEvents(): EventData[] {
    return this.gameEvents;
  }

  clearEventData() {
    this.gameEvents = [];
  }

  startRoll(rollStrength = 0) {
    this.isRolling = true;

    this.dispatchAction({
      type: ACTION_TYPE.ROLL_START,
      value: `(${rollStrength}%)`,
    });
  }

  cancelRoll() {
    this.isRolling = false;
  }

  rollComplete(value: number[] | number) {
    this.isRolling = false;
    this.totalRollCount += 1;

    this.updateRollStats(value);

    this.dispatchAction({
      value,
      type: ACTION_TYPE.ROLL_COMPLETED,
    });
  }

  getIsRolling() {
    return this.isRolling;
  }

  reset() {
    this.totalRollCount = 0;
    this.clearEventData();
    this.resetRollStats();
    this.dispatchAction({ type: ACTION_TYPE.RESET_GAME });
  }

  private resetRollStats() {
    this.rollStats = {};
  }

  private updateRollStatValue(key: number) {
    if (typeof key === "number") {
      if (!this.rollStats[key]) {
        this.rollStats[key] = 0;
      }
      this.rollStats[key] += 1;
    }
  }

  private updateRollStats(rollValue: number | number[]) {
    if (typeof rollValue === "number") {
      this.updateRollStatValue(rollValue);
      return;
    }

    if (Array.isArray(rollValue)) {
      rollValue.forEach((value) => {
        this.updateRollStatValue(value);
      });
    }
  }
}
