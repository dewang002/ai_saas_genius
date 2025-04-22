'use client'

import Heading from '@/components/Heading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Empty from '@/components/Empty'
import { ImageIcon, Loader2 } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { amountOption, formSchema } from './constent'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GoogleGenAI } from '@google/genai'
import axios from 'axios'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'


const googleai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_KEY });

const page = () => {
    const router = useRouter()
    const [images, setImages] = useState<any[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
            amount: "1",
            resolution: "512*512"
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

            setImages([])

            const userPrompt = await googleai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `Generate a detailed image description based on the following prompt.
                Include visual details like composition, colors, lighting, style, and subject matter.
                Make the description specific enough for an image generation AI to create a clear visual.
                Prompt: ${values.prompt}`,
            });

            //@ts-ignore
            const aiResMessage = userPrompt.candidates[0].content.parts[0].text

            const res = await axios.post('/api/image', {
                values
            })

            const url = res.data.map((elem: { url: string }) => elem.url)

            const aiMessage = {
                role: "ai",
                content: url
            }

            setImages((prev): any => [...prev, aiMessage])

            form.reset()
        } catch (err) {
            console.log("[formError]", err)
        } finally {
            router.refresh()
        }
    }

    console.log(images)
    return (
        <div className='flex flex-col gap-4 px-8 py-2'>
            <Heading
                title='Image-generate'
                description='test this most advance conversation Tool'
                icon={ImageIcon}
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
                                            placeholder='what would you like to generate . . .'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='amount'
                            render={({ field }) => (
                                <FormItem>
                                    <Select>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOption.map(elem => (
                                                <div>
                                                    {elem.label}
                                                </div>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                {images.length === 0 && !isLoading && (
                    <div>
                        <Empty />
                    </div>
                )}
                {
                    images.map((elem) => (
                        <div className='w-full'>
                            {
                                elem.role === 'user' ?
                                    <div className='text-white font-semibold w-full'>
                                        <h1 className='max-w-[50%] rounded p-2 drop-shadow-amber-950 border bg-black'>{elem.content}</h1>

                                    </div> :
                                    <div className='text-white flex justify-end font-semibold w-full'>
                                        🤖 <h1 className='lg:max-w-[50%] w-full rounded p-2 bg-black/50 text-white backdrop-blur-2xl border '>
                                            {elem.content}
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