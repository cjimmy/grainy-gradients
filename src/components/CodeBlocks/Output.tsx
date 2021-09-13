import React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { ColorType, useInputStore } from '~/components/store';

export const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;

export const rgbToString = ({ r, g, b, a }: ColorType) => `rgba(${r},${g},${b},${a})`;

const Output: React.FC = () => {
  const [svgProps, cssProps, filterProps] = useInputStore(
    (state) => [state.svgProps, state.cssProps, state.filterProps],
    shallow
  );
  const { size, baseFrequency, numOctaves } = svgProps;
  const { gradientType, color1, color2, angle, showTransparency, posX, posY } = cssProps;
  const { brightness, contrast } = filterProps;
  const gradientFirstParam =
    gradientType === 'linear'
      ? `${angle}deg`
      : gradientType === 'radial'
      ? `circle at ${posX}% ${posY}%`
      : `from ${angle}deg at ${posX}% ${posY}%`;
  const svgString = `<!-- svg: first layer -->
<svg viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'>
  <filter id='noiseFilter'>
    <feTurbulence 
      type='fractalNoise' 
      baseFrequency='${baseFrequency}' 
      numOctaves='${numOctaves}' 
      stitchTiles='stitch'/>
  </filter>
  
  <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
</svg>`;

  const gradientCss = `/* css gradient: second layer */
{
  width: 250px;
  height: 250px;
  background: 
    ${gradientType}-gradient(${gradientFirstParam}, 
      ${rgbToString(color1)}, ${rgbToString(color2)})${
    showTransparency ? ', url(/checkers.png)' : ''
  };
  /* filter: contrast(${contrast}%) brightness(${brightness}%); */
}`;

  const liveCss = `
width: 250px;
height: 250px;
background: ${gradientType}-gradient(${gradientFirstParam}, ${rgbToString(color1)}, ${rgbToString(
    color2
  )}), url("data:image/svg+xml,${svgString.replace(symbols, encodeURIComponent)}");
filter: contrast(${contrast}%) brightness(${brightness}%);
`;

  return (
    <Container>
      <OutputSection>
        <Noise size={size} code={svgString} />
      </OutputSection>
      <OutputSection>
        <Gradient css={gradientCss} />
      </OutputSection>
      <OutputSection>
        <FilterShadow />
        <Filter css={liveCss} />
      </OutputSection>
    </Container>
  );
};

export default Output;

// hacking it for essentially flex-direction: column; which does not work
const Container = styled.div`
  height: 100vh;
  display: flex;
  overflow-y: scroll;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

type NoiseProps = {
  size: number;
  code: string;
};
// prettier-ignore
const Noise = styled.div<NoiseProps>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  background: url("data:image/svg+xml,${(p) => p.code.replace(symbols, encodeURIComponent)}");
  box-shadow: rgb(50 50 93 / 23%) 0px 30px 60px -15px, rgb(0 0 0 / 32%) 0px 18px 36px -18px;
`;

type GradientProps = {
  css: string;
};
const Gradient = styled.div<GradientProps>`
  ${(p) => p.css}
  box-shadow: rgb(50 50 93 / 23%) 0px 30px 60px -15px, rgb(0 0 0 / 32%) 0px 18px 36px -18px;
`;

const OutputSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: calc(100vw * 2 / 3);
  margin: 10px;
`;

// have to create a new layer, or the filter affects box-shadow
const FilterShadow = styled.div`
  position: absolute;
  top: 0;
  width: 250px;
  height: 250px;
  box-shadow: rgb(50 50 93 / 23%) 0px 30px 60px -15px, rgb(0 0 0 / 32%) 0px 18px 36px -18px;
`;

type FilterProps = {
  css: string;
};
const Filter = styled.div<FilterProps>`
  ${(p) => p.css}
`;
