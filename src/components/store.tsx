import create from 'zustand';

export type SvgPropsType = {
  size: number;
  baseFrequency: number;
  numOctaves: number;
};

export type ColorType = { r: number; g: number; b: number; a: number };

export type CssPropsType = {
  gradientType: string;
  angle: number;
  color1: ColorType;
  color2: ColorType;
  showTransparency: boolean;
  posX: number;
  posY: number;
};

export type FilterPropsType = {
  contrast: number;
  brightness: number;
  inlineSvg: boolean;
};

export type InputState = {
  svgProps: SvgPropsType;
  setSvgProps: ({ size, baseFrequency, numOctaves }: SvgPropsType) => void;
  cssProps: CssPropsType;
  setCssProps: ({
    gradientType,
    angle,
    color1,
    color2,
    showTransparency,
    posX,
    posY,
  }: CssPropsType) => void;
  filterProps: FilterPropsType;
  setFilterProps: ({ contrast, brightness, inlineSvg }: FilterPropsType) => void;
  resetAllProps: () => void;
};

export const useInputStore = create<InputState>((set) => ({
  svgProps: {
    size: 250,
    baseFrequency: 0.65,
    numOctaves: 3,
  },
  setSvgProps: ({ size, baseFrequency, numOctaves }) =>
    set({
      svgProps: { size, baseFrequency, numOctaves },
    }),

  cssProps: {
    gradientType: 'linear',
    angle: 112,
    color1: { r: 0, g: 0, b: 255, a: 1 },
    color2: { r: 0, g: 0, b: 0, a: 0 },
    showTransparency: true,
    posX: 50,
    posY: 50,
  },
  setCssProps: ({ gradientType, angle, color1, color2, showTransparency, posX, posY }) =>
    set({
      cssProps: { gradientType, angle, color1, color2, showTransparency, posX, posY },
    }),
  filterProps: {
    contrast: 170,
    brightness: 1000,
    inlineSvg: false,
  },
  setFilterProps: ({ contrast, brightness, inlineSvg }) =>
    set({
      filterProps: { contrast, brightness, inlineSvg },
    }),
  resetAllProps: () =>
    set({
      svgProps: {
        size: 250,
        baseFrequency: 0.65,
        numOctaves: 3,
      },
      cssProps: {
        gradientType: 'linear',
        angle: 112,
        color1: { r: 0, g: 0, b: 255, a: 1 },
        color2: { r: 0, g: 0, b: 0, a: 0 },
        showTransparency: true,
        posX: 50,
        posY: 50,
      },
      filterProps: {
        contrast: 170,
        brightness: 1000,
        inlineSvg: false,
      },
    }),
}));
