import React from 'react';
import ChildrenProps from './ChildrenProps';

export interface PrimaryButtonProps extends ChildrenProps {
  className?: string;
  id?: string;
  type?: 'button' | 'reset' | 'submit';
  onClick?: React.EventHandler<React.SyntheticEvent<HTMLButtonElement>>;
}

function PrimaryButton({ className, children, id, type, onClick }: PrimaryButtonProps) {
  return (
    <button
      id={id}
      className={`${className} rounded py-2 px-4 font-semibold text-teal-100 hover:text-white bg-teal-500 hover:bg-teal-400`}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
