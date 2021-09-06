import { Button } from 'antd';
import React from 'react';
import shallow from 'zustand/shallow';
import { useInputStore } from '~/components/store';

export const Reset: React.FC = () => {
  const [resetAllProps] = useInputStore((state) => [state.resetAllProps], shallow);
  return <Button onClick={() => resetAllProps()}>Reset all</Button>;
};
