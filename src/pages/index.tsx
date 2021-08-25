import React from 'react';
import styled from 'styled-components';
import { SvgSection, CssSection, ResultSection } from '~/components/CodeBlocks';
import { Row, LeftCol, Space } from '~/components/layout';

const IndexPage = () => {
  return (
    <Container>
      <Row>
        <LeftCol>
          <Space h={30} />
          <h1>Grainy Gradient playground</h1>
        </LeftCol>
      </Row>
      <SvgSection />
      <CssSection />
      <ResultSection />
    </Container>
  );
};

export default IndexPage;

const Container = styled.div`
  height: 100vh;
`;
