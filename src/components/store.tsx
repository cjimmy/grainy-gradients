/* eslint no-unused-vars: "off" */

import create from 'zustand';

export type InputState = {
  svgProps: Record<string, number>;
  setSvgProps: ({ size, baseFrequency, numOctaves }) => void;
  cssProps: Record<string, any>;
  setCssProps: ({ gradientType, angle, color1, color2, showTransparency }) => void;
  filterProps: Record<string, number | boolean>;
  setFilterProps: ({ contrast, brightness, inlineSvg }) => void;
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
    angle: 112,
    color1: { r: 0, g: 0, b: 255, a: 1 },
    color2: { r: 0, g: 0, b: 0, a: 0 },
    showTransparency: true,
  },
  setCssProps: ({ gradientType, angle, color1, color2, showTransparency }) =>
    set({
      cssProps: { gradientType, angle, color1, color2, showTransparency },
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
}));
