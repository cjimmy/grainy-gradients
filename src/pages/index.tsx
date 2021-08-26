import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { SvgControls, CssControls, FilterControls } from '~/components/CodeBlocks';
import Output from '~/components/CodeBlocks/Output';
import { Row, LeftCol, Space, RightCol } from '~/components/layout';

const IndexPage = () => {
  return (
    <Container>
      <Head>
        <title>Grainy Gradients playground</title>
      </Head>
      <Row>
        <LeftCol>
          <Scroll>
            <Space h={30} />
            <h1>Grainy Gradient playground</h1>
            <h2>1. SVG</h2>
            <SvgControls />
            <h2>2. CSS Gradient</h2>
            <CssControls />
            <h2>3. CSS Filter</h2>
            <FilterControls />
            <Space h={60} />
          </Scroll>
        </LeftCol>
        <RightCol>
          <Output />
        </RightCol>
      </Row>
    </Container>
  );
};

export default IndexPage;

const Container = styled.div`
  height: 100vh;
`;

const Scroll = styled.div`
  height: 100vh;
  overflow-y: scroll;
  padding: 0 ${(2 / 24) * 100}%;
  background-color: #ddd;
`;
