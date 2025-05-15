"use client"

import React, { useEffect, useState } from 'react'
import ProModel from './ProModel'

const ModelProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return false;
    }

    return (
        <div>
            <ProModel />
        </div>
    )
}

export default ModelProvider