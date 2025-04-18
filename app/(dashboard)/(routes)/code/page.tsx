'use client'

import Heading from '@/components/Heading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Empty from '@/components/Empty'
import { Code2Icon, Divide, Loader2, MessageSquare } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { formSchema } from './constent'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GoogleGenAI } from '@google/genai'
import axios from 'axios'


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

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (!googleai || !googleai.models) {
                console.error("Google AI client or models not available");
                return;
            }

            const userMessage = {
                role: 'user',
                content: values.prompt
            }

            setMessage((prev): any => [...prev, userMessage])

            const userPrompt = await googleai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `you are a code generator. dont write to much just to the point talk and to the point code very accurate. who generate code for me : ${values.prompt}`,
            });

            //@ts-ignore
            const aiResMessage = userPrompt.candidates[0].content.parts[0].text

            const res = await axios.post('/api/conversation', {
                message: aiResMessage
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
                title='code-generate'
                description='test this most advance conversation Tool'
                icon={Code2Icon}
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
                                            placeholder='put your code here . . .'
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
                                        <h1 className='max-w-[50%] rounded p-2 drop-shadow-amber-950 border bg-black'>{elem.content}</h1>

                                    </div> :
                                    <div className='text-white flex justify-end font-semibold w-full'>
                                        🤖 <h1 className='lg:max-w-[50%] w-full rounded p-2 bg-black/50 text-white backdrop-blur-2xl border '>
                                            
                                            <ReactMarkdown // this is new
                                                components={{
                                                    pre: ({ node, ...props }) => (
                                                        <div className='overflow-auto w-full my-2 bg-black'>
                                                            <pre {...props} />
                                                        </div>
                                                    ),
                                                    code: ({ node, ...props }) => (
                                                        <code className='rounded-lg p-1 bg-black/10' {...props} />
                                                    )
                                                }}
                                            >
                                                {elem.content}
                                            </ReactMarkdown>
                                            
                                        </h1>
                                    </div>
                            }
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default page