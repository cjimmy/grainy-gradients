import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import shallow from 'zustand/shallow';
import { useInputStore, AnyGradientType, getRandomGradient } from '../store';
import { GradientRow } from './GradientRow';

export const GradientControls: React.FC = () => {
  const [cssProps, setCssProps] = useInputStore(
    (state) => [state.cssProps, state.setCssProps],
    shallow
  );

  const updateStateOfSelf = React.useCallback(
    (index: number, newData: AnyGradientType) => {
      cssProps.gradients[index] = newData;
      setCssProps({ ...cssProps });
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
    cssProps.gradients.push(getRandomGradient());
    setCssProps(cssProps);
  };

  const gradientInterface = cssProps.gradients.map((grad, i) => (
    <GradientRow
      key={i}
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
