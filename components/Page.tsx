import React from 'react';
import Layout from './Layout';
import { LayoutProps } from './Layout';

export interface PageProps extends LayoutProps {
  pageTitle?: string;
}

function Page({ children, title, pageTitle }: PageProps) {
  return (
    <Layout title={title || pageTitle}>
      {pageTitle && (
        <div className="w-full text-center">
          <h1 className="w-full pb-4">{pageTitle}</h1>
        </div>
      )}
      {children}
    </Layout>
  );
}

export default Page;
