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

  const updateProp = (k: string, v: string | boolean | ColorStopType[] | number) => {
    const newGradient = Object.assign({}, gradient);
    newGradient[k] = v;
    // add default values for radial and conic gradients
    if (k === 'type' && !('posX' in newGradient)) {
      (newGradient as RadialGradientType | ConicGradientType).posX = 50;
      (newGradient as RadialGradientType | ConicGradientType).posY = 50;
    }
    updateSelf(selfIndex, newGradient);
  };

  return (
    <Container>
      <Form name={`gradient-row-${selfIndex}`}>
        <TopRow>
          <TopRowLeft>
            <Form.Item style={{ marginBottom: 0 }}>
              <Select
                value={gradientType}
                onChange={(v: string) => updateProp('type', v)}
                style={{ width: 130 }}
                disabled={!isVisible}
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
          </TopRowLeft>
          <TopRowRight>
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
          </TopRowRight>
        </TopRow>

        {['linear', 'conic'].includes(gradientType) && 'angle' in gradient && (
          <SliderInput
            label="angle"
            name="angle"
            id={`${selfIndex}`}
            min={0}
            max={360}
            tipFormatter={(v) => `${v}°`}
            onChange={(val: number) => updateProp('angle', val)}
            value={typeof gradient.angle === 'number' ? gradient.angle : 0}
            disabled={!isVisible}
          />
        )}
        {['radial', 'conic'].includes(gradientType) && 'posX' in gradient && (
          <>
            <SliderInput
              label="position X"
              name="position X"
              id={`${selfIndex}`}
              min={-50}
              max={150}
              onChange={(val: number) => updateProp('posX', val)}
              value={typeof gradient.posX === 'number' ? gradient.posX : 0}
              disabled={!isVisible}
            />
            <SliderInput
              label="position Y"
              name="position Y"
              id={`${selfIndex}`}
              min={-50}
              max={150}
              onChange={(val: number) => updateProp('posY', val)}
              value={typeof gradient.posY === 'number' ? gradient.posY : 0}
              disabled={!isVisible}
            />
          </>
        )}
      </Form>
    </Container>
  );
};

const VisibilityIcon = styled.div`
  padding: 3px;
  margin: 0 8px;
  cursor: pointer;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TopRowLeft = styled.div`
  display: flex;
`;

const TopRowRight = styled.div`
  display: flex;
`;

const Container = styled.div`
  background-color: #eee;
  border: 1px solid #ccc;
  padding: 12px;
  margin: 12px 0;
`;
