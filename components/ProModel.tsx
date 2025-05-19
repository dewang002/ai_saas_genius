"use client"

import React, { useState } from 'react'
import { Check, Code, ImageIcon, LucideClockFading, MessageSquare } from 'lucide-react'


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { useProModel } from '@/hooks/useProModel'
import { Badge } from './ui/badge'
import { Card } from './ui/card'
import { Button } from './ui/button'
import axios from 'axios'

const tool = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: 'text-violet-700'
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: 'text-pink-700'
    },
    {
        label: "Code Generation",
        icon: Code,
        color: 'text-green-700'
    }
]


const ProModel = () => {
    const proModel = useProModel();
    const [loading, setLoading] = useState(false)

    const subscription = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/stripe');
            window.location.href = await response.data.url;
        } catch (error) {
            console.log(error, "STRIPE_CLIENT_ERROR")
        } finally {
            setLoading(false)
        }
    }
    return (
        <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='flex justify-center items-center gap-4 flex-col'>
                        Upgrade to Genius
                        <Badge className='uppercase text-sm py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                            pro
                        </Badge>
                    </DialogTitle>
                    <DialogDescription className='space-y-2'>
                        {
                            tool.map(elem => (
                                <Card
                                    key={elem.label}
                                    className='border-black/50 flex items-start px-4 justify-between'
                                >
                                    <div className='flex items-center justify-between gap-4 w-full'>
                                        <div className='flex gap-4'>
                                            <elem.icon className={`${elem.color}`} />
                                            <div>{elem.label}</div>
                                        </div>
                                        <Check />
                                    </div>
                                </Card>

                            ))
                        }

                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={subscription}  className='w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                           {loading? <LucideClockFading  /> : `Upgrade`} 
                        </Button>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ProModel