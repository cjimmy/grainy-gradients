import type { AppProps } from 'next/app';
import React from 'react';
import 'antd/dist/antd.css';
import 'highlight.js/styles/base16/outrun-dark.css';
import '~/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
