import React from 'react';
import { LogoProps } from './LogoProps';

function GitLabLogo({ size, className }: LogoProps) {
  return (
    <img src="/gitlab.svg" height={size} width={size} className={className} alt="GitHub Logo" />
  );
}

export default GitLabLogo;
