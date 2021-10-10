import create from 'zustand';

function getRandomFrom<T>(arr: Array<T>): T {
  const randIndex = Math.trunc(Math.random() * 10) % arr.length;
  return arr[randIndex];
}

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
  isRepeating?: boolean;
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
  invert: boolean;
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

const initialSvgProps = {
  size: 250,
  baseFrequency: 0.65,
  numOctaves: 3,
};

export const defaultGradient = {
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
};

export function getRandomGradient(): AnyGradientType {
  return {
    type: getRandomFrom(['linear', 'radial', 'conic']),
    isVisible: true,
    angle: getRandomFrom([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]),
    posX: 50,
    posY: 50,
    stops: [
      {
        color: {
          r: getRandomFrom([0, 255]),
          g: getRandomFrom([0, 255]),
          b: getRandomFrom([0, 255]),
          a: 1,
        },
        offset: 0,
      },
      {
        color: {
          r: getRandomFrom([0, 255]),
          g: getRandomFrom([0, 255]),
          b: getRandomFrom([0, 255]),
          a: 0,
        },
        offset: 1,
      },
    ],
  };
}

const initialCssProps = {
  showTransparency: false,
  gradients: [defaultGradient],
};
const initialFilterProps = {
  contrast: 170,
  brightness: 1000,
  invert: false,
};
export const useInputStore = create<InputState>((set) => ({
  svgProps: initialSvgProps,
  setSvgProps: (props) => set({ svgProps: props }),
  cssProps: initialCssProps,
  setCssProps: (props) => set({ cssProps: props }),
  filterProps: initialFilterProps,
  setFilterProps: (props) => set({ filterProps: props }),
  resetAllProps: () =>
    set({
      svgProps: initialSvgProps,
      cssProps: initialCssProps,
      filterProps: initialFilterProps,
    }),
}));
