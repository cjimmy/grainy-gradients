import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Form, Select } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Row } from '../layout';
import { ColorPicker, ChromePickerColor } from './ColorPicker';
import { SliderInput } from '~/components/CodeBlocks/subcomponents';
import { ColorStopType } from '~/components/store';

export const GradientRow = () => {
  const [gradientType, setGradientType] = useState<string>('linear');
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [colors, setColors] = useState<ColorStopType[]>([
    { color: { r: 0, g: 255, b: 255, a: 1 }, offset: 0 },
    { color: { r: 0, g: 0, b: 0, a: 0 }, offset: 1.0 },
  ]);
  const [angle, setAngle] = useState<number>(0);
  const [posX, setPosX] = useState<number>(50);
  const [posY, setPosY] = useState<number>(50);

  return (
    <Form>
      <Row>
        <VisibilityIcon onClick={() => setIsVisible((v) => !v)}>
          {isVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </VisibilityIcon>
        <Form.Item>
          <Select
            value={gradientType}
            onChange={(v: string) => setGradientType(v)}
            style={{ width: 130 }}
          >
            <Select.Option value="linear">linear</Select.Option>
            <Select.Option value="radial">radial</Select.Option>
            <Select.Option value="conic">conic</Select.Option>
          </Select>
        </Form.Item>
        <ColorPicker
          label="Color 1"
          color={colors[0].color}
          style={{ padding: 0 }}
          onChange={(c: ChromePickerColor) =>
            setColors((colors) => [{ color: c.rgb, offset: 1 }, colors[1]])
          }
        />
        <ColorPicker
          label="Color 2"
          color={colors[colors.length - 1].color}
          onChange={(c: ChromePickerColor) =>
            setColors((colors) => [colors[0], { color: c.rgb, offset: 1 }])
          }
        />
      </Row>

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
    </Form>
  );
};

const VisibilityIcon = styled.div`
  padding: 3px;
`;
