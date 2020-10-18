import React from 'react';
import Head from 'next/head';
import ChildrenProps from './ChildrenProps';

export interface LayoutProps extends ChildrenProps {
  title?: string;
}

function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title === '' || !title ? 'Canvas V2' : title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-screen-xl pt-24 p-4 mx-2 xl:mx-0">{children}</div>
      </div>
    </>
  );
}

Layout.defaultProps = {
  title: '',
};

export default Layout;
