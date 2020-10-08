import React from 'react';

export default interface InputProps<T = HTMLInputElement> {
  required?: boolean;
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  name?: string;
  className?: string;
  onChange?: React.EventHandler<React.SyntheticEvent<T>>;
  message?: string;
  displayMessage?: boolean;
  value?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  autoCapitalize?: string;
  defaultValue?: string;
}
