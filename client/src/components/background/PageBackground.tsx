import { homeBgTop } from '@/assets'
import Image from 'next/image'
import React from 'react'

function PageBackground() {
  return (
    <>
         {/* bg image top */}
      <div className="fixed right-0 mix-blend-multiply">
        <Image src={homeBgTop} alt="home-bg" width={400} height={400} />
      </div>
    </>
  )
}

export default PageBackground