import { bgQ } from '@/assets';
import PageBackground from '@/components/background/PageBackground';
import LoginForm from '@/components/login/LoginForm';
import PageCardSection from '@/components/section/PageCardSection';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

export const metadata: Metadata = {
  title: 'Login - Doctor Chamber',
};

export default function LoginPage() {
  return (
    <section className="relative  min-h-screen">
      {/* background */}
      <PageBackground />

      <PageCardSection>
        <LoginForm />
      </PageCardSection>
    </section>
  );
}
