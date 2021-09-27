import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { AnyGradientType } from '../store';
import { GradientRow } from './GradientRow';

export const GradientPicker: React.FC = () => {
  const initialGradients = [
    {
      type: 'linear',
      isVisible: true,
      angle: 0,
      stops: [
        {
          color: { r: 0, g: 0, b: 255, a: 1 },
          offset: 0,
        },
        {
          color: { r: 0, g: 0, b: 0, a: 0 },
          offset: 1,
        },
      ],
    },
  ];
  const [gradients, setGradients] = useState<AnyGradientType[]>(initialGradients);
  const updateStateOfSelf = (index: number, newData: AnyGradientType) => {
    setGradients((grads) => grads.splice(index, 1, newData));
  };
  const gradientInterface = gradients.map((grad, i) => (
    <GradientRow
      key={`${i}` + grad.type + `${grad.stops[0].color.r}`}
      gradient={grad}
      updateSelf={updateStateOfSelf}
      selfIndex={i}
    />
  ));

  return (
    <div>
      {gradientInterface}
      <Button icon={<PlusOutlined />}>Add gradient</Button>
    </div>
  );
};
