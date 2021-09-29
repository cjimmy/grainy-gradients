import { EyeOutlined, EyeInvisibleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Form, Select, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { ColorPicker, ChromePickerColor } from './ColorPicker';
import { SliderInput } from '~/components/CodeBlocks/subcomponents';
import {
  AnyGradientType,
  ColorStopType,
  ConicGradientType,
  RadialGradientType,
} from '~/components/store';

interface IGradientRow {
  gradient: AnyGradientType;
  selfIndex: number;
  nGradients: number;
  updateSelf: (index: number, newData: AnyGradientType) => void;
  deleteSelf: (index: number) => void;
}
export const GradientRow: React.FC<IGradientRow> = ({
  gradient,
  selfIndex,
  nGradients,
  updateSelf,
  deleteSelf,
}) => {
  const { type: gradientType, isVisible, stops } = gradient;

  const updateProp = (key: string, value: string | boolean | ColorStopType[] | number) => {
    const newGradient = gradient;
    newGradient[key] = value;
    // add default values for radial and conic gradients
    if (key === 'type' && !('posX' in newGradient)) {
      (newGradient as RadialGradientType | ConicGradientType).posX = 50;
      (newGradient as RadialGradientType | ConicGradientType).posY = 50;
    }
    updateSelf(selfIndex, newGradient);
  };

  return (
    <Form>
      <RowContainer>
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
        <VisibilityIcon onClick={() => updateProp('isVisible', !isVisible)}>
          {isVisible ? (
            <Tooltip title="Hide">
              <EyeOutlined />
            </Tooltip>
          ) : (
            <EyeInvisibleOutlined />
          )}
        </VisibilityIcon>
        {nGradients > 1 && (
          <VisibilityIcon onClick={() => deleteSelf(selfIndex)}>
            <Tooltip title="Remove gradient">
              <DeleteOutlined />
            </Tooltip>
          </VisibilityIcon>
        )}
      </RowContainer>

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
  margin: 0 8px;
  cursor: pointer;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
`;
