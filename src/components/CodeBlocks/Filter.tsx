import { Form, Switch } from 'antd';
import hljs from 'highlight.js/lib/core';
import cssLang from 'highlight.js/lib/languages/css';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import { symbols, rgbToString } from './Output';
import SliderInput from './SliderInput';
import { useInputStore } from '~/components/store';
hljs.registerLanguage('css', cssLang);

export const FilterControls = () => {
  const [svgProps, cssProps, setFilterProps] = useInputStore(
    (state) => [state.svgProps, state.cssProps, state.setFilterProps],
    shallow
  );
  const [contrast, setContrast] = useState(170);
  const [brightness, setBrightness] = useState(1000);
  const [inlineSvg, setInlineSvg] = useState(false);
  const { size, baseFrequency, numOctaves } = svgProps;

  useEffect(() => {
    setFilterProps({
      brightness,
      contrast,
      inlineSvg,
    });
  }, [setFilterProps, contrast, brightness, inlineSvg]);

  const { gradientType, angle, color1, color2 } = cssProps;
  const gradientFirstParam =
    gradientType === 'linear'
      ? `${angle}deg`
      : gradientType === 'radial'
      ? 'circle at center'
      : `from ${angle}deg`;
  const cleanSvgString = `<svg viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='${numOctaves}' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseFilter)'/></svg>`;
  const inlineSvgString = `url("data:image/svg+xml,${cleanSvgString.replace(
    symbols,
    encodeURIComponent
  )}")`;
  const resultCssDisplay = `/* resulting css */
{
  width: 250px;
  height: 250px;
  background: ${gradientType}-gradient(${gradientFirstParam}, ${rgbToString(color1)}, ${rgbToString(
    color2
  )}), ${inlineSvg ? inlineSvgString : 'url(/👆/that/noise.svg)'};
  filter: contrast(${contrast}%) brightness(${brightness}%);
}
  `;

  return (
    <div>
      <pre className="hljs">
        <code
          dangerouslySetInnerHTML={{
            __html: hljs.highlight(resultCssDisplay, { language: 'css' }).value,
          }}
        />
      </pre>
      <Form labelCol={{ span: 4 }}>
        <SliderInput
          label="contrast"
          name="contrast"
          min={100}
          max={1000}
          step={10}
          tipFormatter={(v) => `${v}%`}
          onChange={(val: number) => setContrast(val)}
          value={typeof contrast === 'number' ? contrast : 10}
        />
        <SliderInput
          label="brightness"
          name="brightness"
          min={100}
          max={5000}
          step={50}
          tipFormatter={(v) => `${v}%`}
          onChange={(val: number) => setBrightness(val)}
          value={typeof brightness === 'number' ? brightness : 0}
        />
        <Form.Item label="Inline the SVG">
          <Switch size="small" checked={inlineSvg} onChange={(e) => setInlineSvg(e)} />
        </Form.Item>
      </Form>
    </div>
  );
};
