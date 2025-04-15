'use client'

import Heading from '@/components/Heading'
import { MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { formSchema } from './constent'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const page = () => {
    const [isLoading, setisLoding] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        }
    })

    return (
        <div className='flex flex-col gap-4 px-8'>
            <Heading
                title='Conversation'
                description='test this most advance conversation Tool'
                icon={MessageSquare}
                iconColor={'text-violet-700'}
                bgColor={'bg-violet-200'}
            />
            <div className=''>
                <Form {...form}>
                    <form className='grid grid-col-12'>

                    <FormField name='prompt' 
                    render={({field})=>(
                        <FormItem className='col-span-12 lg:col-span-10'>
                            <FormControl className=''>
                                <Input 
                                disabled={isLoading}
                                placeholder='write here . . .'
                                {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <Button disabled={isLoading} className='col-span-12 lg:col-span-2 active:scale-95 transition duration-100 '>send</Button>
                    </form>
                </Form>
            </div>

            <div className=''>
                Message content
            </div>

        </div>
    )
}

export default page