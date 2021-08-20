import type { AppProps } from 'next/app';
import React from 'react';
import '~/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
