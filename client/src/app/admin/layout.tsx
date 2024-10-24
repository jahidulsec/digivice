import Header from '@/components/admin/home/Header';
import Footer from '@/components/footer/Footer';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen'>
      <Header />
      <main className='mb-5'>{children}</main>
      <Footer />
    </div>
  );
}
