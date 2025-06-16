import { Form, Slider, InputNumber } from 'antd';
import styled from 'styled-components';
import { breakpoints } from '~/components/layout';

interface ISliderInput {
  label: string;
  name: string;
  id?: string;
  disabled?: boolean;
  onChange: (val: number) => void;
  value: number;
  min: number;
  max?: number;
  step?: number;
  tipFormatter?: (val: number) => string;
}
export const SliderInput: React.FC<ISliderInput> = (props) => {
  const { label, name, id, onChange, value, min, max, step, tipFormatter, disabled } = props;

  const handleInputNumberChange = (valueFromAntInput: number | string | null) => {
    let numericValue: number;

    if (valueFromAntInput === null) {
      numericValue = min; // Default to min if input is cleared
    } else if (typeof valueFromAntInput === 'string') {
      const parsed = parseFloat(valueFromAntInput); // parseFloat can handle strings like "100px" -> 100
      numericValue = isNaN(parsed) ? min : parsed; // Default to min if parsing fails
    } else { // It's a number
      numericValue = valueFromAntInput;
    }
    
    // Ensure the final numericValue is passed to the parent onChange
    onChange(numericValue);
  };

  // Determine Form.Item name based on whether id is provided
  const formItemName = id === undefined ? name : [name, id];

  return (
    <Form.Item label={label} name={formItemName} style={{ width: '100%', margin: 0 }}>
      <SliderAndInput>
        <SliderContainer>
          <Slider
            tipFormatter={tipFormatter}
            step={step}
            min={min}
            max={max}
            onChange={onChange}
            value={value}
            disabled={disabled}
          />
        </SliderContainer>
        <InputNumber
          step={step}
          style={{ margin: '0 16px' }}
          min={min}
          value={value}
          onChange={handleInputNumberChange}
          formatter={tipFormatter}
          disabled={disabled}
        />
      </SliderAndInput>
    </Form.Item>
  );
};

const SliderContainer = styled.div`
  width: 40%;
  @media screen and (max-width: ${breakpoints.md - 1}px) {
    width: 100%;
  }
`;

const SliderAndInput = styled.div`
  display: flex;
  margin: 3px 0;
`;
