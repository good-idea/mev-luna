export const EventFlags = {
  linkClick: false,
  mouseMove: true,
  mouseClick: true,
  subtitles: true,
};

export type EventFlag = keyof typeof EventFlags;
export type EventState = Record<EventFlag, boolean>;

export type Layer = {
  id: string;
  width: number;
  height: number;
  data: string;
  left?: number;
  top?: number;
  blur?: boolean;
};
