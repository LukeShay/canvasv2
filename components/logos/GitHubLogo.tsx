import React from 'react';
import { LogoProps } from './LogoProps';

function GitHubLogo({ size, className }: LogoProps) {
  return (
    <img src="/github.svg" height={size} width={size} className={className} alt="GitHub Logo" />
  );
}

export default GitHubLogo;
