import React from 'react';
import { CommonProps } from './CommonProps';

function H2({ className, children }: CommonProps) {
  return (
    <div className={`${className} text-3xl leading-9 font-extrabold text-gray-900`}>{children}</div>
  );
}

export default H2;
