import React from 'react';
import { ButtonProps } from './ButtonProps';

function PrimaryButton({ className, children, id, type, filled, onClick }: ButtonProps) {
  const updatedClassName = `${className} rounded py-2 px-3 font-semibold ${
    filled
      ? 'text-indigo-100 hover:text-white bg-indigo-500 hover:bg-indigo-900'
      : 'text-indigo-500 hover:text-indigo-900 bg-transparent border border-indigo-500 hover:border-indigo-900'
  }`;
  return (
    <button
      id={id}
      className={updatedClassName}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {children}
    </button>
  );
}

PrimaryButton.defaultProps = {
  className: '',
  id: '',
  type: 'button',
  filled: true,
};

export default PrimaryButton;
