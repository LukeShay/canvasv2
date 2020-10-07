import React from 'react';
import ChildrenProps from '../ChildrenProps';

export interface FormProps extends ChildrenProps {
  onSubmit?: React.EventHandler<React.FormEvent>;
}

function Form({ children, onSubmit }: FormProps) {
  return (
    <form className="w-full max-w-lg" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
