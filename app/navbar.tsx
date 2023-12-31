"use client"
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  DropdownMenuTrigger,
  Flex,
  Text,
} from "@radix-ui/themes"
import classnames from "classnames"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AiFillBug } from "react-icons/ai"

const Navbar = () => {
  const currentPath = usePathname()
  const { status, data: session } = useSession()
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ]
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classnames({
                      "text-zinc-900": link.href === currentPath,
                      "text-zinc-500": link.href !== currentPath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && session && (
              <DropdownMenu.Root>
                <DropdownMenuTrigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email!}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link
                href="/api/auth/signin"
                className="text-zinc-500 hover:text-zinc-800 transition-colors"
              >
                Login
              </Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default Navbar
