import { Form } from 'antd';
import hljs from 'highlight.js/lib/core';
import React, { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useInputStore, InputState, SvgPropsType } from '~/components/store';
import { SectionTitle, SliderInput } from './subcomponents';

export const SvgControls: React.FC = () => {
  const [svgProps, setSvgProps] = useInputStore(
    useShallow((state: InputState): [SvgPropsType, (props: SvgPropsType) => void] => [
      state.svgProps,
      state.setSvgProps,
    ])
  );

  const { size, baseFrequency, numOctaves } = svgProps;

  // useEffect(() => {
  //   setSvgProps({ size, baseFrequency, numOctaves });
  // }, [size, baseFrequency, numOctaves, setSvgProps]);

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
          onChange={(newVal) => {
            if (svgProps.size !== newVal) {
              setSvgProps({ ...svgProps, size: newVal });
            }
          }}
          tipFormatter={(v) => `${v}px`}
          value={typeof size === 'number' ? size : 1}
        />
        <SliderInput
          label="baseFrequency"
          name="baseFrequency"
          min={0}
          max={10}
          step={0.01}
          onChange={(newVal) => {
            const roundedNewVal = parseFloat(newVal.toFixed(2));
            if (svgProps.baseFrequency !== roundedNewVal) {
              setSvgProps({ ...svgProps, baseFrequency: roundedNewVal });
            }
          }}
          value={typeof baseFrequency === 'number' ? baseFrequency : 1}
        />
        <SliderInput
          label="numOctaves"
          name="numOctaves"
          min={0}
          max={6}
          onChange={(newVal) => {
            if (svgProps.numOctaves !== newVal) {
              setSvgProps({ ...svgProps, numOctaves: newVal });
            }
          }}
          value={typeof numOctaves === 'number' ? numOctaves : 1}
        />
      </Form>
    </div>
  );
};
