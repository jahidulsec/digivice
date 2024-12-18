import PageBackground from '@/components/background/PageBackground';
import LoginForm from '@/components/login/LoginForm';
import PageCardSection from '@/components/section/PageCardSection';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Login - Digivice',
};

export default function LoginPage() {
  return (
    <section className="relative  min-h-full1">
      {/* background */}
      <PageBackground />

      <PageCardSection>
        <LoginForm />
      </PageCardSection>
    </section>
  );
}
