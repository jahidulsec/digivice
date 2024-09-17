import { loginBg } from '@/assets';
import LoginForm from '@/components/login/LoginForm';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

export const metadata: Metadata = {
  title: 'Login - Doctor Chamber',
};

export default function LoginPage() {
  return (
    <section className="relative sm:flex sm:justify-center sm:items-center sm:h-screen sm:bg-pink-50/20 ">
      <div className="relative bg-[#f3dced] sm:bg-transparent sm:max-w-md sm:flex sm:rounded-md sm:shadow-sm sm:border sm:border-pink-300 sm:overflow-hidden">
        {/* background */}
        <div className="absolute w-screen h-screen sm:w-[412px]">
          <Image
            src={loginBg}
            alt="loginBg"
            width={360}
            height={640}
            className="w-full h-full object-cover sm:object-cover object-left-top"
          />
        </div>

        <div className="content relative flex justify-center py-[5rem] px-10 h-screen sm:h-full">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
