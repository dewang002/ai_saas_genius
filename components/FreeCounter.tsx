import { MAX_FREE_COUNT } from '@/Constant'
import React from 'react'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { Zap } from 'lucide-react'
import { useProModel } from '@/hooks/useProModel'

const FreeCounter = ({ count, isPro }: { count: number, isPro: boolean }) => {
    const proModel = useProModel()
    if (isPro) {
        return null;
    }
    return (
        <div className='text-white flex flex-col gap-2 '>
            <Progress className='h-4 border bg-white' value={(count / MAX_FREE_COUNT) * 100} />
            {MAX_FREE_COUNT - count} / {MAX_FREE_COUNT} : remaining free prompt
            <Button onClick={() => proModel.onOpen()} className='text-white border flex gap-4 active:scale-95 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-semibold shadow-lg transition-all duration-300 '>
                Upgrad <Zap fill='white' />
            </Button>
        </div>
    )
}

export default FreeCounter