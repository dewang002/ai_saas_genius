"use client"


import { Code, ImageIcon, LayoutDashboard, MessageSquare, Settings } from 'lucide-react'
import { Montserrat } from 'next/font/google';
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import FreeCounter from './FreeCounter';
import Image from 'next/image';

const montserrat = Montserrat({ weight: "600", subsets: ['latin'] });

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: 'text-sky-300'
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: 'text-violet-700'
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/imgGeneration",
        color: 'text-pink-700'
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: 'text-green-700'
    },
    {
        label: "Setting",
        icon: Settings,
        href: "/settings",
        color: 'text-white'
    },
]

interface remainingCount {
    count: number;
    isPro: boolean;
}

const SideBar = ({ count = 0, isPro = false }: remainingCount) => {
    const pathName = usePathname()
    return (
        <div className={`${montserrat.className} p-4 sidebar flex gap-16 h-full flex-col md:inset-y-0 md:fixed md:w-72 bg-zinc-900`}>
            <Link className='flex items-center gap-4' href={'/dashboard'}>
                <div className='h-10 object-contain'>
                    <Image width={40} height={40} className='object-contain' src='/logo.png' alt='logo' />
                </div>
                <h1 className='text-lg font-bold text-white'>
                    Gin
                </h1>
            </Link>
            <div className='flex flex-col justify-between h-full'>

                <div className='flex flex-col gap-8 justify-between '>
                    {routes.map(elem => (
                        <Link key={elem.label} className={`flex gap-4 ${pathName === elem.href ? 'bg-zinc-600 text-white p-2 rounded' : ' '} `} href={elem.href}>
                            <elem.icon className={`h-6 w-6 ${elem.color}`} />
                            <h1 className='text-white'>{elem.label}</h1>
                        </Link>
                    ))}
                </div>
                <FreeCounter isPro={isPro} count={count} />
            </div>
        </div>
    )
}

export default SideBar;
