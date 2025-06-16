import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  useInputStore,
  AnyGradientType,
  getRandomGradient,
  InputState,
  CssPropsType,
} from '../store';
import { GradientRow } from './GradientRow';

export const GradientControls: React.FC = () => {
  const [cssProps, setCssProps] = useInputStore(
    useShallow((state: InputState): [CssPropsType, (props: CssPropsType) => void] => [
      state.cssProps,
      state.setCssProps,
    ])
  );

  const updateStateOfSelf = React.useCallback(
    (index: number, newData: AnyGradientType) => {
      const newGradients = cssProps.gradients.map((grad, i) =>
        i === index ? newData : grad
      );
      setCssProps({
        ...cssProps,
        gradients: newGradients,
      });
    },
    [cssProps, setCssProps]
  );

  const deleteSelf = React.useCallback(
    (index: number) => {
      const newGradients = [
        ...cssProps.gradients.slice(0, index),
        ...cssProps.gradients.slice(index + 1),
      ];
      setCssProps({ ...cssProps, gradients: newGradients });
    },
    [cssProps, setCssProps]
  );

  const pushNewGradient = () => {
    const newGradients = [...cssProps.gradients, getRandomGradient()];
    setCssProps({
      ...cssProps,
      gradients: newGradients,
    });
  };

  const gradientInterface = cssProps.gradients.map((grad, i) => (
    <GradientRow
      key={grad.id}
      gradient={grad}
      nGradients={cssProps.gradients.length}
      updateSelf={updateStateOfSelf}
      deleteSelf={deleteSelf}
      selfIndex={i}
    />
  ));

  return (
    <div>
      {gradientInterface}
      <Button icon={<PlusOutlined />} onClick={pushNewGradient}>
        Add gradient
      </Button>
    </div>
  );
};
