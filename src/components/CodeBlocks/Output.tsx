import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { useInputStore } from '~/components/store';

export const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;

export const rgbToString = ({ r, g, b, a }) => `rgba(${r},${g},${b},${a})`;

const Output = () => {
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
  background: ${gradientType}-gradient(${gradientFirstParam}, ${rgbToString(color1)}, ${rgbToString(
    color2
  )})${showTransparency ? ', url(/checkers.png)' : ''};
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
      <Noise size={size} code={svgString} />
      <Gradient css={gradientCss} />
      <Filter css={liveCss} />
    </Container>
  );
};

export default Output;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  overflow: scroll;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex-shrink: 1;
`;

// prettier-ignore
const Noise = styled.div`
  width: ${p=>p.size}px;
  height: ${p=>p.size}px;
  background: url("data:image/svg+xml,${(p) => p.code.replace(symbols, encodeURIComponent)}");
`;

const Gradient = styled.div`
  ${(p) => p.css}
`;

const Filter = styled.div`
  ${(p: Record<string, string>) => p.css}
`;
