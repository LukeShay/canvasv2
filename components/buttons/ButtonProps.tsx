import React from 'react';
import ChildrenProps from '../ChildrenProps';

export interface ButtonProps extends ChildrenProps {
  className?: string;
  id?: string;
  type?: 'button' | 'reset' | 'submit';
  filled?: boolean;
  onClick?: React.EventHandler<React.SyntheticEvent<HTMLButtonElement>>;
}
