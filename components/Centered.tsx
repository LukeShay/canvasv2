import React from 'react';
import ChildrenProps from './ChildrenProps';

export interface CenteredProps extends ChildrenProps {
  className?: string;
}

function Centered({ children, className }: CenteredProps) {
  return (
    <div className={`w-full flex justify-center items-center text-center ${className}`}>
      {children}
    </div>
  );
}

export default Centered;
