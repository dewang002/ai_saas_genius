'use client'

import Heading from '@/components/Heading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2, MessageSquare } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { formSchema } from './constent'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import Empty from '@/components/Empty'

const page = () => {
    const router = useRouter()
    const [message, setMessage] = useState<any[]>([])


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        }
    })

    const isLoading = form.formState.isSubmitting//inbuild form functionality

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage = {
                role: 'user',
                content: values.prompt
            }

            setMessage((prev): any => [...prev, userMessage])

            const res = await axios.post('/api/conversation', {
                message: userMessage.content
            })

            const jsonString = res.data
                .replace(/^```json\n/, '')
                .replace(/\n```$/, '')
                .replace(/\*{1,2}/g, '');

            const aiMessage = {
                role: "ai",
                content: jsonString
            }

            setMessage((prev): any => [...prev, aiMessage])

            form.reset()
        } catch (err) {
            console.log("[formError]", err)
        } finally {
            router.refresh()
        }
    }
    console.log(message)
    return (
        <div className='flex flex-col gap-4 px-8 py-2'>
            <Heading
                title='Conversation'
                description='test this most advance conversation Tool'
                icon={MessageSquare}
                iconColor={'text-violet-700'}
                bgColor={'bg-violet-200'}
            />
            <div className='w-full'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-12 gap-2 w-full'>
                        <FormField name='prompt'
                            render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl>
                                        <Input
                                            className="font-semibold"
                                            disabled={isLoading}
                                            placeholder='write here . . .'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className='col-span-12 lg:col-span-2'>
                            <Button
                                type='submit'
                                disabled={isLoading}
                                className='w-full active:scale-95 transition duration-100'
                            >
                                send
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

            <div>
                {isLoading && <div> <Loader2 className='animate-spin' /> thinking . . .</div>}
                {message.length === 0 && !isLoading && (
                    <div>
                        <Empty />
                    </div>
                )}
                {
                    message.map((elem) => (
                        <div className='w-full'>
                            {
                                elem.role === 'user' ?
                                    <div className='text-white font-semibold w-full'>
                                        <h1 className='w-sm rounded p-2 border bg-black/50'>{elem.content}</h1>
                                    </div> :
                                    <div className='text-white flex justify-end font-semibold w-full'>
                                        <h1 className=' w-sm rounded p-2 border bg-black/50'>{elem.content}</h1>
                                    </div>}
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default page