import Nav, { NavLink } from '@/components/ui/Nav';
import { logout } from '../actions/auth';
import Header from '@/components/admin/home/Header';

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
