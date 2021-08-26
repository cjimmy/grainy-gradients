import { Form, Switch, Button, Popover, Select } from 'antd';
import hljs from 'highlight.js/lib/core';
import { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { rgbToString } from './Output';
import SliderInput from './SliderInput';
import { useInputStore } from '~/components/store';

export const CssControls = () => {
  const [setCssProps, filterProps] = useInputStore(
    (state) => [state.setCssProps, state.filterProps],
    shallow
  );
  const { brightness, contrast } = filterProps;
  const [angle, setAngle] = useState(112);
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);
  const [showTransparency, setShowTransparency] = useState(true);
  const [gradientType, setGradientType] = useState('linear');
  const [color1, setColor1] = useState({ r: 0, g: 0, b: 255, a: 1 });
  const [color2, setColor2] = useState({ r: 0, g: 0, b: 255, a: 0 });

  useEffect(() => {
    setCssProps({
      gradientType,
      color1: color1,
      color2: color2,
      angle,
      showTransparency,
      posX,
      posY,
    });
  }, [
    setCssProps,
    showTransparency,
    contrast,
    brightness,
    angle,
    gradientType,
    color1,
    color2,
    posX,
    posY,
  ]);

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
                onChange={(v) => setGradientType(v)}
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
              content={<ChromePicker color={color1} onChange={(c) => setColor1(c.rgb)} />}
              trigger="click"
            >
              <Button>Color 1</Button>
            </Popover>
          </ColorPick>
          <ColorPick>
            <Popover
              placement="bottom"
              content={<ChromePicker color={color2} onChange={(c) => setColor2(c.rgb)} />}
              trigger="click"
            >
              <Button>Color 2</Button>
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
            onChange={(val: number) => setAngle(val)}
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
              onChange={(val: number) => setPosX(val)}
              value={typeof posX === 'number' ? posX : 0}
            />
            <SliderInput
              label="position Y"
              name="position Y"
              min={-50}
              max={150}
              onChange={(val: number) => setPosY(val)}
              value={typeof posY === 'number' ? posY : 0}
            />
          </>
        )}
        <Form.Item label="Show checkered">
          <Switch
            size="small"
            checked={showTransparency}
            onChange={(e) => setShowTransparency(e)}
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
