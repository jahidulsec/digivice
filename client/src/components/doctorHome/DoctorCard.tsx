import { doctorAvatar } from '@/assets/files';
import { Dot, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function DoctorCard() {
  return (
    <article className="min-w-[300px] flex flex-col gap-5 justify-center items-center py-5 px-2 border border-pink-400 rounded-md mb-5 bg-pink-100/50">
      {/* image */}
      <div className="w-[200px] h-[200px] relative rounded-full overflow-hidden border-2 border-pink-500">
        <Image src={doctorAvatar} alt="" fill />
      </div>

      {/* content */}
      <div className="content flex flex-col gap-2">
        <h4 className="font-cb text-xl">Dr. Md. Saiful Ahsan Rana</h4>
        <div className="text-sm flex gap-3">
          <h5 className="designation text-pink-800">Nephrologist</h5>|<h5 className="exp">15+ years of experience</h5>
        </div>

        {/* designation */}
        <div className="text-[11px] flex items-center text-pink-900 gap-1 flex-wrap">
          <span>MBBS</span>
          <Dot />
          <span>MBBS</span>
          <Dot />
          <span>MBBS</span>
          <Dot />
          <span>MBBS</span>
        </div>

        {/* contact */}
        <div className="contact text-sm flex gap-5 ">
          <div className="mobile flex gap-2 items-center">
            <Phone className="size-4 text-pink-600" />
            <span>01888-334455</span>
          </div>
          <div className="email flex gap-2 items-center">
            <Mail className="size-4 text-pink-600" />
            <span>john@email.com</span>
          </div>
        </div>

        {/* address */}
        <div className="flex gap-2 items-center  text-pink-800">
          <MapPin />
          <div className="">
            <h5 className="font-cb text-md">Royal Hospital</h5>
            <h6 className="text-sm text-gray-500">Khilgoan, Dhaka</h6>
          </div>
        </div>
      </div>
    </article>
  );
}

export default DoctorCard;
