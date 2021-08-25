import { Form } from 'antd';
import hljs from 'highlight.js/lib/core';
import cssLang from 'highlight.js/lib/languages/css';
import { useState } from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import SliderInput from './SliderInput';
import { Row, LeftCol, RightCol } from '~/components/layout';
import { useInputStore } from '~/components/store';
hljs.registerLanguage('css', cssLang);

const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;

export const ResultSection = () => {
  const [svgProps, cssProps] = useInputStore((state) => [state.svgProps, state.cssProps], shallow);
  // const [contrast, setContrast] = useState(170);
  // const [brightness, setBrightness] = useState(1000);

  const { gradientType, angle, color1, color2, contrast, brightness } = cssProps;
  const { size, baseFrequency, numOctaves } = svgProps;
  const resultCssDisplay = `/* resulting css */
{
  width: 250px;
  height: 250px;
  background: ${gradientType}(${angle}deg, ${color1}, ${color2}), url(/that/noise.svg);
  filter: contrast(${contrast}%) brightness(${brightness}%);
}
  `;
  const svgString = `<svg viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='${numOctaves}' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseFilter)'/></svg>`;
  const liveCss = `
  width: 250px;
  height: 250px;
  background: ${gradientType}(${angle}deg, ${color1}, ${color2}), url("data:image/svg+xml,${svgString.replace(
    symbols,
    encodeURIComponent
  )}");
  filter: contrast(${contrast}%) brightness(${brightness}%);
  `;
  return (
    <Row>
      <LeftCol>
        <Form labelCol={{ span: 3 }}></Form>
        <pre className="hljs">
          <code
            dangerouslySetInnerHTML={{
              __html: hljs.highlight(resultCssDisplay, { language: 'css' }).value,
            }}
          />
        </pre>{' '}
      </LeftCol>
      <RightCol>
        <Result css={liveCss} />
      </RightCol>
    </Row>
  );
};

const Result = styled.div`
  ${(p) => p.css}
`;
