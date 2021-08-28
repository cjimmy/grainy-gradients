interface ILinkOut {
  href: string;
}
export const LinkOut: React.FC<ILinkOut> = ({ href = '#', children, ...rest }) => (
  <a {...rest} href={href} target="_blank" rel="noreferrer noopener">
    {children}
  </a>
);
