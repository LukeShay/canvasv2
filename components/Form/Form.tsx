import React from 'react';

import { CommonProps } from '../CommonProps';

export interface FormProps extends CommonProps {
  onSubmit?: React.EventHandler<React.FormEvent>;
}

function Form({ children, className, onSubmit }: FormProps) {
  return (
    <form className={`${className} w-full max-w-lg`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
