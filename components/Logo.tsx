import React from 'react';

export interface LogoProps {
  size: number;
  className?: string;
  dark?: boolean;
}

function LightLogo({ size, className }: LogoProps) {
  return (
    <img src="/canvas-v2-light.svg" height={size} width={size} className={className} alt="Logo" />
  );
}

function DarkLogo({ size, className }: LogoProps) {
  return (
    <img src="/canvas-v2-dark.svg" height={size} width={size} className={className} alt="Logo" />
  );
}

function Logo({ size, className, dark }: LogoProps) {
  return dark ? (
    <DarkLogo size={size} className={className} />
  ) : (
    <LightLogo size={size} className={className} />
  );
}

export default Logo;
