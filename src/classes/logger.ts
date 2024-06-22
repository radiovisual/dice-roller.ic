import { LogItem } from "../types";

export class Logger {
  private logs: LogItem[] = [];

  log(logItem: LogItem) {
    this.logs.push(logItem);
  }

  clear() {
    this.logs = [];
  }

  getLogs() {
    return this.logs;
  }
}
