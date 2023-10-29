"use client";

import { Box, Container, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBugFill } from "react-icons/bs";

export default function Navbar() {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
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
          </Flex>

          <Box>
            {status === "authenticated" ? (
              <Link href={"/api/auth/signout"}>Logout</Link>
            ) : (
              <>
                <Link href={"/api/auth/signin"}>Login</Link>
              </>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}
