import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { SvgControls, CssControls, FilterControls, Reset } from '~/components/CodeBlocks';
import Output from '~/components/CodeBlocks/Output';
import { LinkOut } from '~/components/LinkOut';
import { Row, LeftCol, Space, RightCol } from '~/components/layout';
import { breakpoints } from '~/components/layout';

const IndexPage = () => {
  return (
    <div>
      <Head>
        <title>Grainy Gradients playground</title>
        <meta name="description" content="Explore the parameters that make up noisy gradients" />
        <meta name="keywords" content="grainy gradient" />
        <meta name="title" content="Grainy Gradients playground" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <Row>
        <LeftCol>
          <Scroll>
            <Space h={30} />
            <h1>Grainy Gradient playground</h1>
            <p>
              Explore the parameters that make up an effect called the <em>grainy gradient</em>.
              <br />
              Read more on{' '}
              <LinkOut href="https://css-tricks.com/grainy-gradients/">CSS-Tricks</LinkOut>.
            </p>
            <SvgControls />
            <CssControls />
            <FilterControls />
            <Space h={40} />
            <Reset />
            <Space h={20} />
            <hr />
            <footer>
              By <LinkOut href="https://twitter.com/jimmmy">@jimmmy</LinkOut>
              <br />
              View source on{' '}
              <LinkOut href="https://github.com/cjimmy/grainy-gradients">Github</LinkOut>
            </footer>
            <Space h={60} />
          </Scroll>
        </LeftCol>
        <RightCol>
          <Output />
        </RightCol>
      </Row>
    </div>
  );
};

export default IndexPage;

const Scroll = styled.div`
  height: 100vh;
  overflow-y: scroll;
  padding: 0 ${(2 / 24) * 100}%;
  background-color: #e2e2e2;
  @media screen and (max-width: ${breakpoints.md - 1}px) {
    padding: 0 ${(1 / 24) * 100}%;
    height: 100%;
    overflow-y: unset;
  }
`;
