import React from 'react';
import ChildrenProps from '../ChildrenProps';

export interface RowProps extends ChildrenProps {
  className?: string;
}

function Row({ children, className }: RowProps) {
  return <div className={`flex flex-wrap -mx-3 ${className}`}>{children}</div>;
}

export default Row;
