import { Form, Switch } from 'antd';
import hljs from 'highlight.js/lib/core';
import React from 'react';
import { rgbToString } from './Output';
import { SectionTitle } from './subcomponents';
import { GradientControls } from '~/components/GradientControls';
import { AnyGradientType, useInputStore } from '~/components/store';

export const CssControls: React.FC = () => {
  const [cssProps, setCssProps, filterProps] = useInputStore((state) => [
    state.cssProps,
    state.setCssProps,
    state.filterProps,
  ]);
  const { brightness, contrast } = filterProps;
  const { gradients, showTransparency } = cssProps;

  //temp
  const firstGradient = gradients[0];
  const { type: gradientType, stops } = firstGradient;

  const gradientFirstParam = getGradientFirstParam(firstGradient);

  const gradientCss = `/* css gradient: second layer */
{
  width: 250px;
  height: 250px;
  background: ${gradientType}-gradient(${gradientFirstParam}, ${rgbToString(
    stops[0].color
  )}, ${rgbToString(stops[1].color)})${showTransparency ? ', url(/checkers.png)' : ''};
  /* filter: contrast(${contrast}%) brightness(${brightness}%); */
}`;
  return (
    <div>
      <SectionTitle title="2. CSS Gradient" />

      <pre className="hljs">
        <code
          dangerouslySetInnerHTML={{
            __html: hljs.highlight(gradientCss, { language: 'css' }).value,
          }}
        />
      </pre>
      <GradientControls />
      <Form>
        <Form.Item label="Show checkered">
          <Switch
            size="small"
            checked={showTransparency}
            onChange={(e) => {
              setCssProps({ ...cssProps, showTransparency: e });
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export const getGradientFirstParam = (grad: AnyGradientType): string => {
  if ('angle' in grad && grad.type === 'linear') {
    return `${grad.angle}deg`;
  } else if (grad.type === 'radial' && 'posX' in grad) {
    return `circle at ${grad.posX}% ${grad.posY}%`;
  } else if (grad.type === 'conic' && 'angle' in grad && 'posX' in grad) {
    return `from ${grad.angle}deg at ${grad.posX}% ${grad.posY}%`;
  } else {
    return '';
  }
};
