import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

const LandingPage = () => {
  return (
    <div>
      <Link href={'/sign-in'}>
        <Button variant={'default'}>
          SignIn
        </Button>
      </Link>
      <Link href={'/sign-up'}>
        <Button variant={'default'}>
          SignUp
        </Button>
      </Link>
    </div>
  )
}

export default LandingPage;