import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Form, Select } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Row } from '../layout';
import { ColorPicker, ChromePickerColor } from './ColorPicker';
import { SliderInput } from '~/components/CodeBlocks/subcomponents';
import { AnyGradientType } from '~/components/store';

interface IGradientRow {
  gradient: AnyGradientType;
  selfIndex: number;
  updateSelf: (index: number, newData: AnyGradientType) => void;
}
export const GradientRow: React.FC<IGradientRow> = ({ gradient, selfIndex, updateSelf }) => {
  const { type: gradientType, isVisible, stops } = gradient;
  // const [gradientType, setGradientType] = useState<string>('linear');
  // const [isVisible, setIsVisible] = useState<boolean>(true);
  // const [colors, setColors] = useState<ColorStopType[]>([
  //   { color: { r: 0, g: 255, b: 255, a: 1 }, offset: 0 },
  //   { color: { r: 0, g: 0, b: 0, a: 0 }, offset: 1.0 },
  // ]);
  // const [angle, setAngle] = useState<number>(0);
  // const [posX, setPosX] = useState<number>(50);
  // const [posY, setPosY] = useState<number>(50);
  const updateProp = (key: string, value: any) => {
    const newGradient = gradient;
    newGradient[key] = value;
    updateSelf(selfIndex, newGradient);
  };
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
          color={stops[0].color}
          style={{ padding: 0 }}
          onChange={(c: ChromePickerColor) =>
            setColors((colors) => [{ color: c.rgb, offset: 1 }, stops[1]])
          }
        />
        <ColorPicker
          label="Color 2"
          color={stops[stops.length - 1].color}
          onChange={(c: ChromePickerColor) =>
            setColors((colors) => [stops[0], { color: c.rgb, offset: 1 }])
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
          onChange={(val: number) => setAngle(val)}
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
            onChange={(val: number) => setPosX(val)}
            value={typeof gradient.posX === 'number' ? gradient.posX : 0}
          />
          <SliderInput
            label="position Y"
            name="position Y"
            min={-50}
            max={150}
            onChange={(val: number) => setPosY(val)}
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
