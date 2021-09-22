import { Form } from 'antd';
import hljs from 'highlight.js/lib/core';
import React, { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { SectionTitle, SliderInput } from './subcomponents';
import { useInputStore } from '~/components/store';

export const SvgControls: React.FC = () => {
  const [svgProps, setSvgProps] = useInputStore(
    (state) => [state.svgProps, state.setSvgProps],
    shallow
  );

  const { size, baseFrequency, numOctaves } = svgProps;

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
      <SectionTitle title="1. SVG" copyText={svgString} />
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
          onChange={(newVal) => setSvgProps({ size: newVal, baseFrequency, numOctaves })}
          tipFormatter={(v) => `${v}px`}
          value={typeof size === 'number' ? size : 1}
        />
        <SliderInput
          label="baseFrequency"
          name="baseFrequency"
          min={0}
          max={10}
          step={0.01}
          onChange={(newVal) => setSvgProps({ size, baseFrequency: newVal, numOctaves })}
          value={typeof baseFrequency === 'number' ? baseFrequency : 1}
        />
        <SliderInput
          label="numOctaves"
          name="numOctaves"
          min={0}
          max={6}
          onChange={(newVal) => setSvgProps({ size, baseFrequency, numOctaves: newVal })}
          value={typeof numOctaves === 'number' ? numOctaves : 1}
        />
      </Form>
    </div>
  );
};
