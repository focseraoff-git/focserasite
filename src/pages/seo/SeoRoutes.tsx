// src/pages/seo/SeoRoutes.tsx
// AUTO-GENERATED — Do not edit manually.
// Single dynamic route replaces 553+ static routes.

import { Routes, Route, useParams } from 'react-router-dom';
import SeoPageTemplate from '../../components/seo/SeoPageTemplate';
import { seoPageDataMap } from '../../data/seoPageData';

function SeoPageResolver() {
  const params = useParams();
  const slug = params['*'] || '';
  const pageData = seoPageDataMap[slug];

  if (!pageData) {
    return (
      <div className="min-h-screen bg-focsera-bg flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold text-focsera-text mb-4 font-heading">Page Not Found</h1>
        <p className="text-focsera-muted mb-8 max-w-md">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <a href="/" className="btn-primary">
          Back to Home
        </a>
      </div>
    );
  }

  return <SeoPageTemplate data={pageData} />;
}

export default function SeoRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<SeoPageResolver />} />
    </Routes>
  );
}
