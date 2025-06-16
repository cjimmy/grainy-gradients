import { ReactNode } from 'react';

interface ILinkOut {
  href: string;
  children?: ReactNode;
}
export const LinkOut: React.FC<ILinkOut> = ({ href = '#', children, ...rest }) => (
  <a {...rest} href={href} target="_blank" rel="noreferrer noopener">
    {children}
  </a>
);
