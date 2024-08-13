import { loginBg } from '@/assets';
import { smockingImg } from '@/assets/files';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import FolderPageHeader from '@/components/folder/Header';

function FolderPage() {
  return (
    <section className="relative ">
      <div className="relative bg-[#f3dced] ">
        {/* background */}
        <div className="absolute w-screen sm:w-full min-h-screen h-fit">
          <Image src={loginBg} alt="loginBg" width={360} height={640} className="w-full h-full object-cover" />
        </div>

        {/* contents */}
        <div className="content relative flex justify-center py-[5rem] px-10 min-h-screen sm:h-full">
          <div className=" px-5 py-10 sm:py-5 w-full min-w-[360px] min-h-[85vh] h-fit font-light border-2 rounded-md border-pink-100 bg-pink-300/40">
            {/* header */}
            <FolderPageHeader />

            <div className="sm:flex sm:flex-wrap  grid grid-cols-2 justify-center items-center gap-2">
              <article className="flex flex-col justify-center items-center p-2 gap-5 bg-pink-50 w-[10rem] md:w-[18.75rem] rounded-md shadow-md">
                <Image src={smockingImg} alt="" width={300} height={300} />
                <div>
                  <h4 className="text-sm font-bk text-center">ধূমপান ৯০% ফুসফুসে ক্যান্সারের কারণ</h4>
                </div>
              </article>

              <article className="flex flex-col justify-center items-center p-2 gap-5 bg-pink-50 w-[10rem] md:w-[18.75rem] rounded-md shadow-md">
                <Image src={smockingImg} alt="" width={300} height={300} />
                <div>
                  <h4 className="text-sm font-bk text-center">ধূমপান ৯০% ফুসফুসে ক্যান্সারের কারণ</h4>
                </div>
              </article>

              <article className="flex flex-col justify-center items-center p-2 gap-5 bg-pink-50 w-[10rem] md:w-[18.75rem] rounded-md shadow-md">
                <Image src={smockingImg} alt="" width={300} height={300} />
                <div>
                  <h4 className="text-sm font-bk text-center">ধূমপান ৯০% ফুসফুসে ক্যান্সারের কারণ</h4>
                </div>
              </article>
              <article className="flex flex-col justify-center items-center p-2 gap-5 bg-pink-50 w-[10rem] md:w-[18.75rem] rounded-md shadow-md">
                <Image src={smockingImg} alt="" width={300} height={300} />
                <div>
                  <h4 className="text-sm font-bk text-center">ধূমপান ৯০% ফুসফুসে ক্যান্সারের কারণ</h4>
                </div>
              </article>

              <article className="flex flex-col justify-center items-center p-2 gap-5 bg-pink-50 w-[10rem] md:w-[18.75rem] rounded-md shadow-md">
                <video src={'/uti.mp4'} width={300} height={300} controls className="w-[300px] aspect-square" />
                <div>
                  <h4 className="text-sm font-bk text-center">UTI বা ইউরিনারি ট্র্যাক্ট ইনফেকশন হলে করনীয় কি?</h4>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FolderPage;
