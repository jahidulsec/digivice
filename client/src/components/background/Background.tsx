import { homeBgBottom, homeBgTop } from '@/assets'
import Image from 'next/image'
import React from 'react'

function Background() {
  return (
    <>
        {/* bg image top */}
      <div className="absolute right-0">
        <Image src={homeBgTop} alt="home-bg" width={400} height={400} />
      </div>

      {/* bg image bottom */}
      <div className="absolute bottom-0">
        <Image src={homeBgBottom} alt="home-bg" width={307} height={280} />
      </div>
    </>
  )
}

export default Background