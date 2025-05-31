import { bgQ } from '@/assets'
import Image from 'next/image'
import React from 'react'

function PageCardSection({children}: {children: React.ReactNode}) {
  return (
    <section className="relative page-content-section flex items-center justify-center min-h-screen py-10 z-10">
        <div className=" bg-p2 dark:bg-pink-900 border-2 rounded-md border-white w-[80vw] min-h-[80vh]">
          <div className="relative flex justify-center mt-10 w-full opacity-10 dark:opacity-100">
            <Image src={bgQ} width={180} height={180} alt='Q'  /> 
          </div>

          {children}
        </div>
      </section>
  )
}

export default PageCardSection