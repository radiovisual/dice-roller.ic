import { EventData } from "../../classes/event-emitter";

export type PlayLogProps = {
  logItems: EventData[];
  onClearLogItems: () => void;
};
