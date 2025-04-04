import React from 'react';
import Head from 'next/head';
import { SEO as SEOType } from '../types/sanity';

interface SEOProps {
  seo: Partial<SEOType>;
}

export const SEO: React.FC<SEOProps> = ({ seo }) => {
  // Use provided values or fall back to defaults
  const metaTitle = seo.title || 'Default Title';
  const metaDescription = seo.description || 'Default description';
  const metaKeywords = seo.keywords || '';
  const metaImage = seo.image?.asset?.url || '';

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      {metaImage && <meta property="og:image" content={metaImage} />}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
    </Head>
  );
};
