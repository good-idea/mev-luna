export type DisplayMode = 'background' | 'mini' | 'hidden' | 'overlay';

export type Layer = {
  id: string;
  width: number;
  height: number;
  data: string;
  left?: number;
  top?: number;
  blur?: boolean;
};
