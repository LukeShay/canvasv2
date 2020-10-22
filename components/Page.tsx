import React from 'react';
import Layout, { LayoutProps } from './Layout';

export interface PageProps extends LayoutProps {
  pageTitle?: string;
}

function Page({ children, title }: PageProps) {
  return <Layout title={title}>{children}</Layout>;
}

export default Page;
