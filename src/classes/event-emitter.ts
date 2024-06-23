import { GameAction, Player } from "../types";

export type EventData =
  | string
  | number
  | { [key: string]: string | object }
  | Player
  | GameAction
  | undefined;
export type EventCallback = (data: EventData) => void;

export class EventEmitter {
  private events: { [key: string]: EventCallback[] } = {};

  on(event: string, callback: EventCallback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event: string, callback: EventCallback) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }

  emit(event: string, data?: EventData) {
    if (!this.events[event]) return;

    this.events[event].forEach((callback) => callback(data));
  }
}
