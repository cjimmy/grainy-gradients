import { Form } from 'antd';
import hljs from 'highlight.js/lib/core';
import xmlLang from 'highlight.js/lib/languages/xml';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import SliderInput from './SliderInput';
import { Row, LeftCol, RightCol } from '~/components/layout';
import { useInputStore } from '~/components/store';
hljs.registerLanguage('xml', xmlLang);

const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;

export const SvgSection = () => {
  const [setSvgProps] = useInputStore((state) => [state.setSvgProps], shallow);

  const [size, setSize] = useState(200);
  const [baseFrequency, setBaseFrequency] = useState(0.65);
  const [numOctaves, setNumOctaves] = useState(3);

  useEffect(() => {
    setSvgProps({ size, baseFrequency, numOctaves });
  }, [size, baseFrequency, numOctaves, setSvgProps]);

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

  return (
    <Row>
      <LeftCol>
        <Form labelCol={{ span: 3 }}>
          <SliderInput
            label="SVG size"
            name="size"
            min={1}
            max={400}
            onChange={(val) => setSize(val)}
            value={typeof size === 'number' ? size : 1}
          />
          <SliderInput
            label="baseFrequency"
            name="baseFrequency"
            min={0}
            max={10}
            step={0.01}
            onChange={(val) => setBaseFrequency(val)}
            value={typeof baseFrequency === 'number' ? baseFrequency : 1}
          />
          <SliderInput
            label="numOctaves"
            name="numOctaves"
            min={0}
            max={6}
            onChange={(val) => setNumOctaves(val)}
            value={typeof numOctaves === 'number' ? numOctaves : 1}
          />
        </Form>

        <pre className="hljs">
          <code
            dangerouslySetInnerHTML={{
              __html: hljs.highlight(svgString, { language: 'xml' }).value,
            }}
          />
        </pre>
      </LeftCol>
      <RightCol>
        <Noise size={size} code={svgString} />
      </RightCol>
    </Row>
  );
};

type NoiseProps = {
  noiseWidth: number;
  noiseHeight: number;
};

// prettier-ignore
const Noise = styled.div<NoiseProps>`
  width: ${p=>p.size}px;
  height: ${p=>p.size}px;
  background: url("data:image/svg+xml,${(p) => p.code.replace(symbols, encodeURIComponent)}");
`;
