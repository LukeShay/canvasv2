import React from 'react';
import ChildrenProps from '../ChildrenProps';

export interface RowProps extends ChildrenProps {
  className?: string;
}

function Row({ children, className }: RowProps) {
  return <div className={`${className} flex flex-wrap -mx-3`}>{children}</div>;
}

export default Row;
