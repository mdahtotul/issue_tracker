"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBugFill } from "react-icons/bs";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="flex items-center space-x-6 border-b mb-5 px-5 h-14">
      <Link href={"/"}>
        <BsBugFill />
      </Link>

      <ul className="flex space-x-6">
        {links.map((link, idx) => (
          <li
            key={idx}
            className={`${
              link.href === pathname ? "text-zinc-900" : "text-zinc-500"
            } hover:text-zinc-800 transition-colors`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
