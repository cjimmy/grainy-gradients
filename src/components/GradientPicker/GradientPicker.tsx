import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useInputStore, AnyGradientType } from '../store';
import { GradientRow } from './GradientRow';

export const GradientPicker: React.FC = () => {
  const [cssProps, setCssProps] = useInputStore((state) => [state.cssProps, state.setCssProps]);

  const updateStateOfSelf = (index: number, newData: AnyGradientType) => {
    setCssProps({ ...cssProps, gradients: cssProps.gradients.splice(index, 1, newData) });
  };
  const gradientInterface = cssProps.gradients.map((grad, i) => (
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
