export const EventFlags = {
  linkClick: false,
  mouseMove: true,
  mouseClick: true,
  subtitles: true,
};

export type EventFlag = keyof typeof EventFlags;
export type EventState = Record<EventFlag, boolean>;

export type ResidueSettings = {
  blur: number;
  maxDarkness: number;
  buildUpSpeed: number;
  strokeWidth: number;
};

export type Layer = {
  id: string;
  width: number;
  height: number;
  data: string;
  left?: number;
  top?: number;
  blur?: boolean;
};
