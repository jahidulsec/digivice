import { loginBg } from '@/assets';
import Button from '@/components/doctorHome/Button';
import Image from 'next/image';
import React from 'react';

function DoctorHome() {
  return (
    <section className="relative sm:flex sm:justify-center sm:items-center sm:h-screen sm:bg-pink-50/20 ">
      <div className="relative bg-[#f3dced] sm:bg-transparent sm:max-w-md sm:flex sm:rounded-md sm:shadow-sm sm:border sm:border-pink-300 sm:overflow-hidden">
        {/* background */}
        <div className="absolute w-screen h-screen sm:w-[450px]">
          <Image src={loginBg} alt="loginBg" width={360} height={640} className="w-full h-full object-cover" />
        </div>

        {/* contents */}
        <div className="content relative flex justify-center py-[5rem] px-10 h-screen sm:h-full">
          {/* buttons */}
          <div className="flex flex-col gap-10 px-5 py-10 sm:py-5 justify-center w-full min-w-[360px] sm:min-h-[40vh] font-light border-2 rounded-md border-pink-100 bg-pink-300/40">
            <Button title="Patient Education" />
            <Button title="Health News" />
            <Button title="Health Risk" />
            <Button title="Special Day" />
            <Button title="Chamber Schedule" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorHome;
