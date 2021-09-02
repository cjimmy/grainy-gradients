import { Button } from 'antd';
import shallow from 'zustand/shallow';
import { useInputStore } from '~/components/store';

export const Reset = () => {
  const [resetAllProps] = useInputStore((state) => [state.resetAllProps], shallow);
  return <Button onClick={() => resetAllProps()}>Reset all</Button>;
};
