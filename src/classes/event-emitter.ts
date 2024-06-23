import { nanoid } from "nanoid";
import { GameAction } from "../types";

export interface EventData extends GameAction {
  id: string;
  date: Date;
}

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

  emit(event: string, data: GameAction) {
    if (!this.events[event]) return;

    const eventData = {
      id: nanoid(),
      date: new Date(),
      ...(data ?? {}),
    } as EventData;

    this.events[event].forEach((callback) => callback(eventData));
  }
}
