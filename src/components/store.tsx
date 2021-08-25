/* eslint no-unused-vars: "off" */

import create from 'zustand';

export type InputState = {
  svgProps: any;
  setSvgProps: ({ size, baseFrequency, numOctaves }) => void;
  cssProps: any;
  setCssProps: ({ gradientType, angle, color1, color2, contrast, brightness }) => void;
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
    gradientType: 'linear-gradient',
    angle: 20,
    color1: 'blue',
    color2: 'transparent',
    contrast: 170,
    brightness: 1000,
  },
  setCssProps: ({ gradientType, angle, color1, color2, contrast, brightness }) =>
    set({
      cssProps: { gradientType, angle, color1, color2, contrast, brightness },
    }),
}));
