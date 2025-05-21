import Heading from '@/components/Heading'
import SubscriptionButton from '@/components/SubscriptionButton'
import { checkApiLimit } from '@/lib/api-limit'
import React from 'react'

const Settingpage = async () => {
  const isPro = await checkApiLimit()
  return (
    <div className='px-4'>
      <Heading
        title='settings'
        description='manage settings'
      />
      <div className='mt-4'>
        <div className='text-muted-foreground text-sm pb-2'>
          {isPro ? "you are in Pro-mode" : "you are in Free-tier"}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}

export default Settingpage