import React from 'react';
import ChildrenProps from '../ChildrenProps';

function CenterForm({ children }: ChildrenProps) {
  return (
    <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full p-10 min-h-full">{children}</div>
    </div>
  );
}

export default CenterForm;
