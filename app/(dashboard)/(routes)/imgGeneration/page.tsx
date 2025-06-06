'use client'

import Heading from '@/components/Heading'

import { ImageIcon } from 'lucide-react'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { Button } from '@/components/ui/button'
import { useProModel } from '@/hooks/useProModel'
import toast from 'react-hot-toast'
import Image from 'next/image'



const Imgpage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('')

    const proModel = useProModel()


    const handleGenerate = async () => {
        try {
            setLoading(true);
            setImagePreview(null);

            const response = await axios.post('/api/generateImage', {
                prompt: prompt
            });

            if (!response.data) {
                throw new Error('Generation failed');
            }

            const data = await response.data;

            // If there's an image, create download link
            if (data.image) {
                const previewUrl = `data:image/png;base64,${data.image}`;
                setImagePreview(previewUrl);
            }
        } catch (error) {
            const err = error as AxiosError;
            if (err.response?.status === 403) {
                proModel.onOpen();
            } else {
                toast.error('something went wrong');
            }
        } finally {
            setLoading(false);
            setPrompt('')
            router.refresh()
        }
    };
    const handleDownload = () => {
        if (!imagePreview) return;

        const link = document.createElement('a');
        link.href = imagePreview;
        link.download = 'generated-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='flex flex-col gap-4 px-8 py-2'>
            <Heading
                title='Image-generate'
                description='test this most advance conversation Tool'
                icon={ImageIcon}
                iconColor={'text-violet-700'}
                bgColor={'bg-violet-200'}
            />
            <div className="container">
                <input placeholder='create a dog image . . .' type="text" value={prompt} className='rounded border p-1 sm:w-xl w-full' onChange={(e) => setPrompt(e.target.value)} />
                <Button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="cursor-pointer border border-rounded p-1 "
                >
                    {loading ? 'Generating...' : 'Create Magic Image'}
                </Button>

                {imagePreview && (
                    <div className='mt-4'>
                        <Image
                            height={100}
                            width={800}
                            src={imagePreview}
                            alt="Generated content"
                            className='rounded-lg shadow-lg min:w-100 object-cover mx-auto'
                        />
                        <Button
                            onClick={handleDownload}
                            className='mt-4'
                        >
                            Download Image
                        </Button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Imgpage