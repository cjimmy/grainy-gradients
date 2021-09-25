import create from 'zustand';

export type SvgPropsType = {
  size: number;
  baseFrequency: number;
  numOctaves: number;
};

export type ColorType = { r: number; g: number; b: number; a: number };
export type AnyGradientType = LinearGradientType | RadialGradientType | ConicGradientType;

export type CssPropsType = {
  showTransparency: boolean;
  gradients: AnyGradientType[];
};

export type ColorStopType = {
  color: ColorType;
  offset: number;
};

type BaseGradientType = {
  type: string;
  stops: ColorStopType[];
  isVisible: boolean;
};

export type LinearGradientType = BaseGradientType & {
  angle: number;
};

export type RadialGradientType = BaseGradientType & {
  posX: number;
  posY: number;
};

export type ConicGradientType = BaseGradientType & {
  posX: number;
  posY: number;
  angle: number;
};

export type FilterPropsType = {
  contrast: number;
  brightness: number;
  inlineSvg: boolean;
};

export type InputState = {
  svgProps: SvgPropsType;
  setSvgProps: (props: SvgPropsType) => void;
  cssProps: CssPropsType;
  setCssProps: (props: CssPropsType) => void;
  filterProps: FilterPropsType;
  setFilterProps: (props: FilterPropsType) => void;
  resetAllProps: () => void;
};

export const useInputStore = create<InputState>((set) => ({
  svgProps: {
    size: 250,
    baseFrequency: 0.65,
    numOctaves: 3,
  },
  setSvgProps: (props) => set({ svgProps: props }),

  cssProps: {
    showTransparency: true,
    gradients: [
      {
        type: 'linear',
        isVisible: true,
        angle: 0,
        stops: [
          {
            color: { r: 0, g: 0, b: 255, a: 1 },
            offset: 0,
          },
          {
            color: { r: 0, g: 0, b: 0, a: 0 },
            offset: 1,
          },
        ],
      },
    ],
  },
  setCssProps: (props) => set({ cssProps: props }),
  filterProps: {
    contrast: 170,
    brightness: 1000,
    inlineSvg: false,
  },
  setFilterProps: (props) => set({ filterProps: props }),
  resetAllProps: () =>
    set({
      svgProps: {
        size: 250,
        baseFrequency: 0.65,
        numOctaves: 3,
      },
      cssProps: {
        showTransparency: true,
        gradients: [
          {
            type: 'linear',
            isVisible: true,
            angle: 0,
            stops: [
              {
                color: { r: 0, g: 0, b: 255, a: 1 },
                offset: 0,
              },
              {
                color: { r: 0, g: 0, b: 0, a: 0 },
                offset: 1,
              },
            ],
          },
        ],
      },
      filterProps: {
        contrast: 170,
        brightness: 1000,
        inlineSvg: false,
      },
    }),
}));
