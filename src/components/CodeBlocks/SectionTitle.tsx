import { CopyOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import CopyToClipboard from '~/components/CopyToClipboard';
interface ISectionTitle {
  title: string;
  copyText?: string;
}
export const SectionTitle: React.FC<ISectionTitle> = ({ title, copyText }) => {
  return (
    <TitleBar>
      <H2>{title}</H2>
      {copyText && (
        <CopyToClipboard textToCopy={copyText}>
          <Button icon={<CopyOutlined />}>Copy</Button>
        </CopyToClipboard>
      )}
    </TitleBar>
  );
};

const H2 = styled.h2`
  margin: 28px 0 10px 0;
`;
const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
