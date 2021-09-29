import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useInputStore, AnyGradientType, defaultGradient } from '../store';
import { GradientRow } from './GradientRow';

export const GradientControls: React.FC = () => {
  const [cssProps, setCssProps] = useInputStore((state) => [state.cssProps, state.setCssProps]);

  const updateStateOfSelf = (index: number, newData: AnyGradientType) => {
    cssProps.gradients[index] = newData;
    setCssProps({ ...cssProps });
  };

  const deleteSelf = (index: number) => {
    const newGradients = [
      ...cssProps.gradients.slice(0, index),
      ...cssProps.gradients.slice(index + 1),
    ];
    setCssProps({ ...cssProps, gradients: newGradients });
  };

  const pushNewGradient = () => {
    cssProps.gradients.push(defaultGradient);
    setCssProps({ ...cssProps });
  };

  const gradientInterface = cssProps.gradients.map((grad, i) => (
    <GradientRow
      key={`${i}` + grad.type + `${grad.stops[0].color.r}`}
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
