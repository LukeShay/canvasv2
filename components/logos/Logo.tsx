import React from 'react';
import { LogoProps } from './LogoProps';

// function LightLogo({ size, className }: LogoProps) {
//   return (
//     <img src="/canvas-v2-light.svg" height={size} width={size} className={className} alt="Logo" />
//   );
// }

// function DarkLogo({ size, className }: LogoProps) {
//   return (
//     <img src="/canvas-v2-dark.svg" height={size} width={size} className={className} alt="Logo" />
//   );
// }

function Logo({ size, className }: LogoProps) {
  return <img src="/logo.svg" height={size} width={size} className={className} alt="logo" />;
}

Logo.defaultProps = {
  dark: false,
};

export default Logo;
