import { Button } from 'antd';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useInputStore, InputState } from '~/components/store';

export const Reset: React.FC = () => {
  const [resetAllProps] = useInputStore(
    useShallow((state: InputState): [() => void] => [state.resetAllProps])
  );
  return <Button onClick={() => resetAllProps()}>Reset all</Button>;
};
