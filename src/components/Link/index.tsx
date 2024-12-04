import { FC, MouseEvent, ReactNode } from "react";
import NextLink from "next/link";

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  isExternalLink?: boolean;
  isOpenNewTab?: boolean;
  isDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export const Link: FC<Props> = ({
  children,
  className,
  href,
  isExternalLink = false,
  isOpenNewTab = false,
  isDisabled = false,
  onClick,
}) => {
  const target = isOpenNewTab ? "_blank" : undefined;
  const rel = isOpenNewTab ? "noopener noreferrer" : undefined;

  if (isDisabled) {
    return <span className={className}>{children}</span>;
  }

  if (isExternalLink) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={className}
        onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={className}
      target={target}
      onClick={onClick}>
      {children}
    </NextLink>
  );
};
