import Head from 'next/head';
import React from 'react';

interface IHeadContent {
  title: string;
  description: string;
  canonicalUrl: string;
  canonicalImage: string;
  canonicalImageAlt?: string;
  socialTitle?: string;
  socialDescription?: string;
  socialImage?: string;
  socialImageAlt?: string;
}

const HeadContent: React.FC<IHeadContent> = (props) => {
  const {
    title,
    description,
    canonicalImage,
    canonicalImageAlt,
    canonicalUrl,
    socialTitle,
    socialDescription,
    socialImage,
    socialImageAlt,
  } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        {/* <link rel="icon" href={'/favicon.ico'} /> */}
        {/* <link rel="icon" href={'/icon.svg'} type="image/svg+xml" /> */}
        <link rel="canonical" href={canonicalUrl} />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> */}
        <meta name="description" content={description} />
        <meta name="keywords" content="noise, gradient, css" />
        <meta name="title" content={title} />
        <meta name="theme-color" content="#333333" />

        <meta prefix="og: http://ogp.me/ns#" property="og:url" content={canonicalUrl} />
        <meta prefix="og: http://ogp.me/ns#" property="og:type" content="website" />
        <meta prefix="og: http://ogp.me/ns#" property="og:title" content={socialTitle || title} />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:description"
          content={socialDescription || description}
        />
        {(socialImage || canonicalImage) && (
          <meta
            prefix="og: http://ogp.me/ns#"
            property="og:image"
            content={socialImage || canonicalImage}
          />
        )}
        {(socialImage || canonicalImage) && (
          <meta
            prefix="og: http://ogp.me/ns#"
            property="og:image:alt"
            content={socialImageAlt || canonicalImageAlt}
          />
        )}
        <meta prefix="og: http://ogp.me/ns#" property="og:locale" content="en_US" />

        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={socialTitle || title} />
        <meta name="twitter:description" content={socialDescription || description} />
        {(socialImage || canonicalImage) && (
          <meta name="twitter:image" content={socialImage || canonicalImage} />
        )}
        {(socialImage || canonicalImage) && (
          <meta name="twitter:image:alt" content={socialImageAlt || canonicalImageAlt} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:site" content="@jimmmy" /> */}

        <meta name="application-name" content={socialTitle || title} />
        <meta name="apple-mobile-web-app-title" content={socialTitle || title} />
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/static/touch/apple-touch-icon.png" /> */}
        {/* <link rel="manifest" href="/manifest.webmanifest" /> */}
      </Head>
    </>
  );
};

export default HeadContent;
