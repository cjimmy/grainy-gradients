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

  const gradientsString = gradients
    .filter((grad) => grad.isVisible)
    .map(
      (grad) =>
        `${grad.type}-gradient(${getGradientFirstParam(grad)}, ${rgbToString(
          grad.stops[0].color
        )}, ${rgbToString(grad.stops[1].color)})`
    );

  const gradientCss = `/* css gradient: second layer */
{
  width: 250px;
  height: 250px;
  background: \n\t${gradientsString.join(',\n\t')}${
    showTransparency ? ',\n\turl(/checkers.png)' : ''
  };
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
      <Form>
        <Form.Item label="Show checkered background" style={{ marginBottom: 4 }}>
          <Switch
            size="small"
            checked={showTransparency}
            onChange={(e) => {
              setCssProps({ ...cssProps, showTransparency: e });
            }}
          />
        </Form.Item>
      </Form>
      <GradientControls />
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
