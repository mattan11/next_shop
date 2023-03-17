import React, { ReactElement } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  classActive?: string;
}

export const ActiveLink = ({
  children,
  classActive = "text-lime-400",
  ...props
}: ActiveLinkProps) => {
  const router = useRouter();

  const pathMatches = router.asPath === props.href;
  const onlyChild = React.Children.only(children);

  return (
    <Link {...props}>
      {React.cloneElement(onlyChild, {
        className: pathMatches
          ? `${classActive}`
          : `${onlyChild.props.className}`,
      })}
    </Link>
  );
};
