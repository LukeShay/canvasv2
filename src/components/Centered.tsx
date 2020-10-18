import React from 'react';
import ChildrenProps from './ChildrenProps';

export interface CenteredProps extends ChildrenProps {
  className?: string;
}

function Centered({ children, className }: CenteredProps) {
  return <div className={`${className} w-full flex justify-center items-center`}>{children}</div>;
}

export default Centered;
