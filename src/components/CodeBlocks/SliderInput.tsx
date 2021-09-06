import { Form, Slider, InputNumber } from 'antd';
import styled from 'styled-components';

interface ISliderInput {
  label: string;
  name: string;
  onChange: (val: number) => void;
  value: number;
  min: number;
  max?: number;
  step?: number;
  tipFormatter?: (val: number) => string;
}
const SliderInput: React.FC<ISliderInput> = (props) => {
  const { label, name, onChange, value, min, max, step, tipFormatter } = props;
  return (
    <Form.Item label={label} name={name} style={{ width: '100%', margin: 0 }}>
      <SliderAndInput>
        <SliderContainer>
          <Slider
            tipFormatter={tipFormatter}
            step={step}
            min={min}
            max={max}
            onChange={onChange}
            value={value}
          />
        </SliderContainer>
        <InputNumber
          step={step}
          style={{ margin: '0 16px' }}
          min={min}
          value={value}
          onChange={onChange}
          formatter={tipFormatter}
        />
      </SliderAndInput>
    </Form.Item>
  );
};

export default SliderInput;

const SliderContainer = styled.div`
  width: 40%;
`;

const SliderAndInput = styled.div`
  display: flex;
  margin: 3px 0;
`;
