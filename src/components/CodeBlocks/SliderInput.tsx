import { Form, Slider, InputNumber } from 'antd';
import styled from 'styled-components';

const SliderInput = (props) => {
  const { label, name, onChange, value, min, max, step } = props;
  return (
    <Form.Item label={label} name={name}>
      <SliderAndInput>
        <SliderContainer>
          <Slider step={step} min={min} max={max} onChange={onChange} value={value} />
        </SliderContainer>
        <InputNumber
          step={step}
          style={{ margin: '0 16px' }}
          min={min}
          value={value}
          onChange={onChange}
        />
      </SliderAndInput>
    </Form.Item>
  );
};

export default SliderInput;

const SliderContainer = styled.div`
  width: 50%;
`;

const SliderAndInput = styled.div`
  display: flex;
`;
