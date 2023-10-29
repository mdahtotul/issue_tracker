"use client";

import { Spinner } from "@/components";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBugFill } from "react-icons/bs";

export default function Navbar() {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <BsBugFill />
            </Link>
            <NavLinks />
          </Flex>

          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

export function NavLinks() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <ul className="flex space-x-6">
      {links.map((link, idx) => (
        <li
          key={idx}
          className={link.href === pathname ? "active-nav-link" : "nav-link"}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}

export function AuthStatus() {
  const { status, data: session } = useSession();
  return (
    <Box>
      {status === "authenticated" ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session?.user?.image!}
              fallback="?"
              size={"2"}
              radius="full"
              className="cursor-pointer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size={"2"}>{session?.user?.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href={"/api/auth/signout"}>Logout</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : status === "loading" ? (
        <Spinner />
      ) : (
        <Link className="nav-link" href={"/api/auth/signin"}>
          Login
        </Link>
      )}
    </Box>
  );
}
