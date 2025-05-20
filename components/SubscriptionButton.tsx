"use client"


import React, { useState } from 'react'
import { Button } from './ui/button'
import { Zap } from 'lucide-react'
import axios from 'axios'


interface buttonProp {
    isPro: boolean
}

const SubscriptionButton = ({ isPro = false }: buttonProp) => {
    const [loading, setLoading] = useState(false)
    const onclick = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe")
            window.location.href = response.data.url
        } catch (err) {
            console.log("Billing_Error", err)
        }finally{
            setLoading(false)
        }
    }
    return (
        <Button disabled={loading} onClick={onclick} className='bg-blue-600 text-white'>
            {isPro ? "Manage Subscription" : "upgrade"}
            {!isPro && <Zap className='fill white' />}
        </Button>
    )
}

export default SubscriptionButton