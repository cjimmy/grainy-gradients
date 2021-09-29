import { getGradientFirstParam } from '.';
import { Form, Switch } from 'antd';
import hljs from 'highlight.js/lib/core';
import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import { symbols, rgbToString } from './Output';
import { SectionTitle, SliderInput } from './subcomponents';
import { useInputStore } from '~/components/store';

export const FilterControls: React.FC = () => {
  const [svgProps, cssProps, filterProps, setFilterProps] = useInputStore(
    (state) => [state.svgProps, state.cssProps, state.filterProps, state.setFilterProps],
    shallow
  );
  const { contrast, brightness, invert } = filterProps;
  const [inlineSvg, setInlineSvg] = useState(false);
  const { size, baseFrequency, numOctaves } = svgProps;

  const { gradients } = cssProps;
  const gradientsString = gradients.map((grad) => {
    return `${grad.type}-gradient(${getGradientFirstParam(grad)}, ${rgbToString(
      grad.stops[0].color
    )}, ${rgbToString(grad.stops[1].color)})`;
  });

  const cleanSvgString = `<svg viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='${numOctaves}' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseFilter)'/></svg>`;
  const inlineSvgString = `url("data:image/svg+xml,${cleanSvgString.replace(
    symbols,
    encodeURIComponent
  )}")`;
  const resultCssDisplay = `/* resulting css */
{
  width: 250px;
  height: 250px;
  background: ${gradientsString.join(', ')}, ${
    inlineSvg ? inlineSvgString : 'url(/👆/that/noise.svg)'
  };
  filter: contrast(${contrast}%) brightness(${brightness}%)${invert ? ' invert(100%)' : ''};
}
  `;

  return (
    <div>
      <SectionTitle title="3. SVG + Gradient + CSSfilter" copyText={resultCssDisplay} />

      <pre className="hljs">
        <code
          dangerouslySetInnerHTML={{
            __html: hljs.highlight(resultCssDisplay, { language: 'css' }).value,
          }}
        />
      </pre>
      <Form>
        <SliderInput
          label="contrast"
          name="contrast"
          min={100}
          max={1000}
          step={10}
          tipFormatter={(v) => `${v}%`}
          onChange={(val: number) =>
            setFilterProps({
              ...filterProps,
              contrast: val,
            })
          }
          value={typeof contrast === 'number' ? contrast : 10}
        />
        <SliderInput
          label="brightness"
          name="brightness"
          min={100}
          max={1500}
          step={50}
          tipFormatter={(v) => `${v}%`}
          onChange={(val: number) =>
            setFilterProps({
              ...filterProps,
              brightness: val,
            })
          }
          value={typeof brightness === 'number' ? brightness : 0}
        />
        <Form.Item label="Invert">
          <Switch
            size="small"
            checked={invert}
            onChange={(v) =>
              setFilterProps({
                ...filterProps,
                invert: v,
              })
            }
          />
        </Form.Item>
        <Form.Item label="Inline the SVG">
          <Switch size="small" checked={inlineSvg} onChange={(e) => setInlineSvg(e)} />
        </Form.Item>
      </Form>
    </div>
  );
};
