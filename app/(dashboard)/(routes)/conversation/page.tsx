'use client'


import Heading from '@/components/Heading'
import { MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { formSchema } from './constent'
import { zodResolver } from '@hookform/resolvers/zod'

const page = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        }
    })
    return (
        <div>
            <Heading
                title='Conversation'
                description='test this most advance conversation Tool'
                icon={MessageSquare}
                iconColor={'text-violet-700'}
                bgColor={'bg-violet-200'}
            />
        </div>
    )
}

export default page