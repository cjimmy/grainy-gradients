import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Form, Select } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Row } from '../layout';
import { ColorPicker, ChromePickerColor } from './ColorPicker';
import { SliderInput } from '~/components/CodeBlocks/subcomponents';
import { AnyGradientType, ColorStopType } from '~/components/store';

interface IGradientRow {
  gradient: AnyGradientType;
  selfIndex: number;
  updateSelf: (index: number, newData: AnyGradientType) => void;
}
export const GradientRow: React.FC<IGradientRow> = ({ gradient, selfIndex, updateSelf }) => {
  const { type: gradientType, isVisible, stops } = gradient;

  const updateProp = (key: string, value: string | boolean | ColorStopType[] | number) => {
    const newGradient = gradient;
    newGradient[key] = value;
    updateSelf(selfIndex, newGradient);
  };

  return (
    <Form>
      <Row>
        <VisibilityIcon onClick={() => updateProp('isVisible', !isVisible)}>
          {isVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </VisibilityIcon>
        <Form.Item>
          <Select
            value={gradientType}
            onChange={(v: string) => updateProp('type', v)}
            style={{ width: 130 }}
          >
            <Select.Option value="linear">linear</Select.Option>
            <Select.Option value="radial">radial</Select.Option>
            <Select.Option value="conic">conic</Select.Option>
          </Select>
        </Form.Item>
        <ColorPicker
          label="Color 1"
          color={stops[0].color}
          style={{ padding: 0 }}
          onChange={(c: ChromePickerColor) =>
            updateProp('stops', [{ color: c.rgb, offset: 1 }, stops[1]])
          }
        />
        <ColorPicker
          label="Color 2"
          color={stops[stops.length - 1].color}
          onChange={(c: ChromePickerColor) =>
            updateProp('stops', [stops[0], { color: c.rgb, offset: 1 }])
          }
        />
      </Row>

      {['linear', 'conic'].includes(gradientType) && 'angle' in gradient && (
        <SliderInput
          label="angle"
          name="angle"
          min={0}
          max={360}
          tipFormatter={(v) => `${v}°`}
          onChange={(val: number) => updateProp('angle', val)}
          value={typeof gradient.angle === 'number' ? gradient.angle : 0}
        />
      )}
      {['radial', 'conic'].includes(gradientType) && 'posX' in gradient && (
        <>
          <SliderInput
            label="position X"
            name="position X"
            min={-50}
            max={150}
            onChange={(val: number) => updateProp('posX', val)}
            value={typeof gradient.posX === 'number' ? gradient.posX : 0}
          />
          <SliderInput
            label="position Y"
            name="position Y"
            min={-50}
            max={150}
            onChange={(val: number) => updateProp('posY', val)}
            value={typeof gradient.posY === 'number' ? gradient.posY : 0}
          />
        </>
      )}
    </Form>
  );
};

const VisibilityIcon = styled.div`
  padding: 3px;
`;
