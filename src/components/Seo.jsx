import React from 'react';
import { Helmet } from 'react-helmet-async';

const Seo = ({ title, description, canonical, type = 'website', name = 'Core X' }) => {
    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{title ? `${title} | ${name}` : name}</title>
            <meta name="description" content={description} />
            {canonical && <link rel="canonical" href={`https://corex.agency${canonical}`} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title ? `${title} | ${name}` : name} />
            <meta property="og:description" content={description} />
            {/* <meta property="og:image" content="https://corex.agency/og-image.jpg" /> */}
            <meta property="og:url" content={canonical ? `https://corex.agency${canonical}` : 'https://corex.agency'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title ? `${title} | ${name}` : name} />
            <meta name="twitter:description" content={description} />
            {/* <meta name="twitter:image" content="https://corex.agency/og-image.jpg" /> */}
        </Helmet>
    );
};

export default Seo;
