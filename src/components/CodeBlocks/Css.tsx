import { Form } from 'antd';
import hljs from 'highlight.js/lib/core';
import cssLang from 'highlight.js/lib/languages/css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import SliderInput from './SliderInput';
import { Row, LeftCol, RightCol } from '~/components/layout';
import { useInputStore } from '~/components/store';
hljs.registerLanguage('css', cssLang);

export const CssSection = () => {
  const [cssProps, setCssProps] = useInputStore(
    (state) => [state.cssProps, state.setCssProps],
    shallow
  );
  const [contrast, setContrast] = useState(170);
  const [brightness, setBrightness] = useState(1000);
  const [angle, setAngle] = useState(20);
  const [gradientType, setGradientType] = useState('linear-gradient');
  const [color1, setColor1] = useState('blue');
  const [color2, setColor2] = useState('transparent');

  useEffect(() => {
    setCssProps({
      gradientType,
      color1,
      color2,
      contrast,
      brightness,
      angle,
    });
  }, [setCssProps, contrast, brightness, angle, gradientType, color1, color2]);

  const gradientCss = `/* css gradient: second layer */
{
  width: 250px;
  height: 250px;
  background: ${gradientType}(${angle}deg, ${color1}, ${color2}), url(/checkers.png);
  /* filter: contrast(${contrast}%) brightness(${brightness}%); */
}`;
  return (
    <Row>
      <LeftCol>
        <Form labelCol={{ span: 3 }}>
          <SliderInput
            label="contrast"
            name="contrast"
            min={0}
            max={1000}
            step={10}
            onChange={(val: number) => setContrast(val)}
            value={typeof contrast === 'number' ? contrast : 10}
          />
          <SliderInput
            label="brightness"
            name="brightness"
            min={0}
            max={5000}
            step={50}
            onChange={(val: number) => setBrightness(val)}
            value={typeof brightness === 'number' ? brightness : 0}
          />
          <SliderInput
            label="angle"
            name="angle"
            min={0}
            max={360}
            onChange={(val: number) => setAngle(val)}
            value={typeof angle === 'number' ? angle : 0}
          />
        </Form>
        <pre className="hljs">
          <code
            dangerouslySetInnerHTML={{
              __html: hljs.highlight(gradientCss, { language: 'css' }).value,
            }}
          />
        </pre>{' '}
      </LeftCol>
      <RightCol>
        <Gradient css={gradientCss} />
      </RightCol>
    </Row>
  );
};

const Gradient = styled.div`
  ${(p) => p.css}
`;
