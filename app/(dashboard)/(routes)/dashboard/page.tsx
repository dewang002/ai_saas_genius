"use client"
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Dashboard = () => {
  return (
    <div className=' flex items-center '>
      <Button variant={"outline"}>click</Button>
      <UserButton />
    </div>
  )
}

export default Dashboard