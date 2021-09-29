import { Button, Popover } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';
import React from 'react';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';
import { rgbToString } from '~/components/CodeBlocks/Output';
import { breakpoints } from '~/components/layout';
import { ColorType } from '~/components/store';

interface IColorPicker {
  color: ColorType;
  onChange: (c: ChromePickerColor) => void;
  label: string;
  style?: React.CSSProperties;
  tooltipPlacement?: TooltipPlacement;
}
export const ColorPicker: React.FC<IColorPicker> = ({
  style,
  label,
  color,
  onChange,
  tooltipPlacement,
}) => {
  return (
    <ColorPick>
      <Popover
        placement={tooltipPlacement || 'bottom'}
        style={style || {}}
        content={<ChromePicker color={color} onChange={onChange} />}
        trigger="click"
      >
        <ColorAndButton>
          <ColorSample color={rgbToString(color)} />
          <Button>{label}</Button>
        </ColorAndButton>
      </Popover>
    </ColorPick>
  );
};

//https://casesandberg.github.io/react-color/
export type ChromePickerColor = {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  hsl: {
    h: number;
    s: number;
    l: number;
    a: number;
  };
};

const ColorPick = styled.div`
  margin-left: 15px;
  @media screen and (max-width: ${breakpoints.md - 1}px) {
    margin: 10px 0;
  }
`;

const ColorSample = styled.div`
  width: 30px;
  height: 30px;
  background: linear-gradient(0, ${(p) => p.color}, ${(p) => p.color}), url(/checkers.png);
  border-radius: 1px;
  cursor: pointer;
`;

const ColorAndButton = styled.div`
  display: flex;
  align-items: center;
`;
