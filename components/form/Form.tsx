import React from 'react';

import { CommonProps } from '../CommonProps';

export interface FormProps extends CommonProps {
  onSubmit?: React.EventHandler<React.FormEvent>;
  method?: string;
  action?: string;
}

function Form({ children, className, method, action, onSubmit }: FormProps) {
  return (
    <form
      className={`${className} w-full max-w-lg`}
      onSubmit={onSubmit}
      method={method}
      action={action}
    >
      {children}
    </form>
  );
}

export default Form;
