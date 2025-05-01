"use client"
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const tools = [
  {
    title: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: 'text-violet-700',
    bg: 'bg-violet-200',
  },
  {
    title: "Image Creation",
    icon: ImageIcon,
    href: "/imgGeneration",
    color: 'text-pink-700',
    bg: 'bg-pink-200',
  },
  {
    title: "Code Generation",
    icon: Code,
    href: "/codeGeneration",
    color: 'text-green-700',
    bg: 'bg-green-200',
  },
]

const Dashboard = () => {
  const router = useRouter()
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='text-center px-4 mb-16'>
        <h1 className='font-bold text-3xl'>Explore the power of AI</h1>
        <p className='font-light'>Chat with the smater AI - Expericence the power of AI</p>
      </div>
      <div className='flex flex-col items-center justify-center gap-4'>
        {
          tools.map(elem => (
            <div onClick={()=>router.push(elem.href)} className='shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400 flex hover:cursor-pointer w-80 md:w-sm px-4 py-2 rounded-md border items-center justify-between'>
              <div className='flex items-center gap-4 '>
                <elem.icon className={`${elem.color} ${elem.bg} p-1 rounded`} />
                <p className='font-semibold'>{elem.title}</p>
              </div>
              <ArrowRight />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard