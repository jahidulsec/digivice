import Nav, { NavLink } from '@/components/ui/Nav';

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <Nav>
          <NavLink href="/admin">Dashboard</NavLink>
        </Nav>
      </header>
      <main>{children}</main>
    </>
  );
}
