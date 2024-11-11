import { homeBgBottom, homeBgTop } from '@/assets'
import Image from 'next/image'
import React from 'react'

function Background() {
  return (
    <>
        {/* bg image top */}
      <div className="fixed right-0 mix-blend-multiply">
        <Image src={homeBgTop} alt="home-bg" width={400} height={400} />
      </div>

      {/* bg image bottom */}
      <div className="fixed bottom-0 mix-blend-multiply">
        <Image src={homeBgBottom} alt="home-bg" width={307} height={280} />
      </div>
    </>
  )
}

export default Background