import Link from "next/link";
import type { ReactNode } from "react";

interface NavItemProps {
  children: ReactNode;
  href: string;
}

const NavItem = ({ children, href }: NavItemProps) => {
  return (
    <li>
      <Link className="font-sans text-lg" href={href}>
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
