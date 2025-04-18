'use client'

import Heading from '@/components/Heading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Divide, Loader, Loader2, MessageSquare } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { formSchema } from './constent'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { GoogleGenAI } from '@google/genai'
import axios from 'axios'
import Empty from '@/components/Empty'

const googleai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_KEY });

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
            if (!googleai || !googleai.models) {
                console.error("Google AI client or models not available");
                return;
            }

            const userPrompt = await googleai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: values.prompt,
            });
            //@ts-ignore
            const newMessage = userPrompt.candidates[0].content.parts[0].text

            const res = await axios.post('/api/conversation', {
                message: newMessage
            })
            console.log(res)
            setMessage((prev): any => [...prev, res.data])
            form.reset()
        } catch (err) {
            console.log("[formError]", err)
        } finally {
            router.refresh()
        }
    }

    return (
        <div className='flex flex-col gap-4 px-8'>
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
                {isLoading && <div> <Loader2 className='animate-spin'/> thinking . . .</div> }
                {message.length===0 && !isLoading &&(
                    <div>
                        <Empty />
                    </div>
                )}
                {
                    message.map((elem) => (
                        <div className='border rounded-md p-2 bg-zinc-300 my-4'>
                            {elem}
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default page