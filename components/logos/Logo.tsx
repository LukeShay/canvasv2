import React from 'react';
import { LogoProps } from './LogoProps';

function Logo({ size, className }: LogoProps) {
  return <img src="/logo.svg" height={size} width={size} className={className} alt="logo" />;
}

Logo.defaultProps = {
  dark: false,
};

export default Logo;
