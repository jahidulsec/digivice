import { loginBg } from '@/assets';
import { smockingImg } from '@/assets/files';
import Button from '@/components/doctorHome/Button';
import Image from 'next/image';
import React from 'react';

function FolderPage() {
  return (
    <section className="relative ">
      <div className="relative bg-[#f3dced] h-full ">
        {/* background */}
        <div className="absolute w-screen h-screen">
          <Image src={loginBg} alt="loginBg" width={360} height={640} className="w-full h-full object-cover" />
        </div>

        {/* contents */}
        <div className="content relative flex justify-center py-[5rem] px-10 h-screen sm:h-full">
          <div className=" px-5 py-10 sm:py-5 w-full min-w-[360px] min-h-[85vh] h-fit font-light border-2 rounded-md border-pink-100 bg-pink-300/40">
            {/* buttons */}
            <h2 className="font-cb pb-1 mb-2 border-b border-pink-50 text-pink-900">Images</h2>
            <div className="sm:flex sm:flex-wrap sm:justify-start grid grid-cols-2 justify-center items-center gap-2">
              <article className="flex flex-col justify-center items-center p-2 gap-5 bg-pink-50 w-[10rem] rounded-md shadow-md">
                <Image src={smockingImg} alt="" width={300} height={300} />
                <div>
                  <h4 className="text-sm font-bk text-center">ধূমপান ৯০% ফুসফুসে ক্যান্সারের কারণ</h4>
                </div>
              </article>

              <article className="flex flex-col justify-center items-center p-2 gap-5 bg-pink-50 w-[10rem] rounded-md shadow-md">
                <Image src={smockingImg} alt="" width={300} height={300} />
                <div>
                  <h4 className="text-sm font-bk text-center">ধূমপান ৯০% ফুসফুসে ক্যান্সারের কারণ</h4>
                </div>
              </article>

              <article className="flex flex-col justify-center items-center p-2 gap-5 bg-pink-50 w-[10rem] rounded-md shadow-md">
                <Image src={smockingImg} alt="" width={300} height={300} />
                <div>
                  <h4 className="text-sm font-bk text-center">ধূমপান ৯০% ফুসফুসে ক্যান্সারের কারণ</h4>
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
