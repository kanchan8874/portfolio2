import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Kanchan Kushwaha - Full Stack Developer Portfolio",
  description = "MERN Full Stack Developer creating seamless, scalable, and user-friendly web applications. Explore my projects and skills.",
  image = "/logo512.png",
  url = "https://portfolio-gamma-wheat-89.vercel.app",
  keywords = "Full Stack Developer, MERN Stack, React, Node.js, MongoDB, Portfolio, Web Developer"
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Kanchan Kushwaha" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Kanchan Kushwaha Portfolio" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional */}
      <meta name="theme-color" content="#3b82f6" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;





