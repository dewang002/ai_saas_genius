import Image from 'next/image'
import React from 'react'

const Empty = () => {
  return (
    <div className='h-[50vh] w-full flex items-center justify-center'>
      <Image width={300} height={300} src={'/loadingImg.png'} alt='loading' />
    </div>
  )
}

export default Empty