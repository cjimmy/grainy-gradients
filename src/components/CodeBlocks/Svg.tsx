import { Form } from 'antd';
import hljs from 'highlight.js/lib/core';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import SliderInput from './SliderInput';
import { useInputStore } from '~/components/store';

export const SvgControls = () => {
  const [setSvgProps] = useInputStore((state) => [state.setSvgProps], shallow);

  const [size, setSize] = useState(250);
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
    <div>
      <pre className="hljs">
        <code
          dangerouslySetInnerHTML={{
            __html: hljs.highlight(svgString, { language: 'xml' }).value,
          }}
        />
      </pre>
      <Form>
        <SliderInput
          label="SVG size"
          name="size"
          min={1}
          max={400}
          onChange={(val) => setSize(val)}
          tipFormatter={(v) => `${v}px`}
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
    </div>
  );
};
