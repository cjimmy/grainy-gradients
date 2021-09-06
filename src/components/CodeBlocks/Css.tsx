import { Form, Switch, Button, Popover, Select } from 'antd';
import hljs from 'highlight.js/lib/core';
import React from 'react';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { rgbToString } from './Output';
import { SectionTitle } from './SectionTitle';
import SliderInput from './SliderInput';
import { ColorType, useInputStore } from '~/components/store';

export const CssControls: React.FC = () => {
  const [setCssProps, cssProps, filterProps] = useInputStore(
    (state) => [state.setCssProps, state.cssProps, state.filterProps],
    shallow
  );
  const { brightness, contrast } = filterProps;
  const { gradientType, color1, color2, angle, showTransparency, posX, posY } = cssProps;

  const setValues = (key: string, value: any) => {
    const toSet = {
      gradientType,
      color1,
      color2,
      angle,
      showTransparency,
      posX,
      posY,
    };
    toSet[key] = value;
    setCssProps(toSet);
  };

  const gradientFirstParam =
    gradientType === 'linear'
      ? `${angle}deg`
      : gradientType === 'radial'
      ? `circle at ${posX}% ${posY}%`
      : `from ${angle}deg at ${posX}% ${posY}%`;

  const gradientCss = `/* css gradient: second layer */
{
  width: 250px;
  height: 250px;
  background: ${gradientType}-gradient(${gradientFirstParam}, ${rgbToString(color1)}, ${rgbToString(
    color2
  )})${showTransparency ? ', url(/checkers.png)' : ''};
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
        <GradientControls>
          <div>
            <Form.Item label="Gradient type">
              <Select
                value={gradientType}
                onChange={(v: string) => setValues('gradientType', v)}
                style={{ width: 120 }}
              >
                <Select.Option value="linear">linear</Select.Option>
                <Select.Option value="radial">radial</Select.Option>
                <Select.Option value="conic">conic</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <ColorPick>
            <Popover
              placement="bottom"
              style={{ padding: 0 }}
              content={<ChromePicker color={color1} onChange={(c) => setValues('color1', c.rgb)} />}
              trigger="click"
            >
              <ColorAndButton>
                <ColorSample color={rgbToString(color1)} />
                <Button>Color 1</Button>
              </ColorAndButton>
            </Popover>
          </ColorPick>
          <ColorPick>
            <Popover
              placement="bottom"
              content={<ChromePicker color={color2} onChange={(c) => setValues('color2', c.rgb)} />}
              trigger="click"
            >
              <ColorAndButton>
                <ColorSample color={rgbToString(color2)} />
                <Button>Color 2</Button>
              </ColorAndButton>
            </Popover>
          </ColorPick>
        </GradientControls>

        {['linear', 'conic'].includes(gradientType) && (
          <SliderInput
            label="angle"
            name="angle"
            min={0}
            max={360}
            tipFormatter={(v) => `${v}°`}
            onChange={(val: number) => setValues('angle', val)}
            value={typeof angle === 'number' ? angle : 0}
          />
        )}
        {['radial', 'conic'].includes(gradientType) && (
          <>
            <SliderInput
              label="position X"
              name="position X"
              min={-50}
              max={150}
              onChange={(val: number) => setValues('posX', val)}
              value={typeof posX === 'number' ? posX : 0}
            />
            <SliderInput
              label="position Y"
              name="position Y"
              min={-50}
              max={150}
              onChange={(val: number) => setValues('posY', val)}
              value={typeof posY === 'number' ? posY : 0}
            />
          </>
        )}
        <Form.Item label="Show checkered">
          <Switch
            size="small"
            checked={showTransparency}
            onChange={(e) => setValues('showTransparency', e)}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

const GradientControls = styled.div`
  display: flex;
`;

const ColorPick = styled.div`
  margin-left: 15px;
`;

const ColorSample = styled.div`
  width: 30px;
  height: 30px;
  background: linear-gradient(0, ${p=>p.color}, ${p=>p.color}), url(/checkers.png);
  border-radius: 1px;
  cursor: pointer;
`;

const ColorAndButton = styled.div`
  display: flex;
  align-items: center;
`;
