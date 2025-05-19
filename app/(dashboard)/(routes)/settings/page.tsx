import Heading from '@/components/Heading'
import SubscriptionButton from '@/components/SubscriptionButton'
import { checkApiLimit } from '@/lib/api-limit'
import { Settings } from 'lucide-react'
import React from 'react'

const page = async () => {
  const isPro = await checkApiLimit()
  return (
    <div>
      <Heading
        title='settings'
        description='manage settings'
        icon={Settings}
        iconColor='text-gray-700'
        bgColor='bg-grey-700/10'
      />
      <div className='px-4 lg:px-8 space-y-4'>
        <div className='text-muted-foreground text-sm'>
          {isPro ? "you are in Pro-mode" : "you are in Free-tier"}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}

export default page