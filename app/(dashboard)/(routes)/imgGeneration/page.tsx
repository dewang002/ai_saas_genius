'use client'

import Heading from '@/components/Heading'

import { ImageIcon } from 'lucide-react'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'



const page = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [prompt, setPrompt] = useState('')

    const handleGenerate = async () => {
        try {
            setLoading(true);
            setResult(null)
            setImagePreview(null);

            const response = await axios.post('/api/generateImage', {
                prompt: prompt
            });

            if (!response.data) {
                throw new Error('Generation failed');
            }

            const data = await response.data;
            setResult(data);

            // If there's an image, create download link
            if (data.image) {
                const previewUrl = `data:image/png;base64,${data.image}`;
                //@ts-ignore
                setImagePreview(previewUrl);
            }
        } catch (error) {
            console.error('Error:', error);
            //@ts-ignore
            alert('Generation failed: ' + error.message);
        } finally {
            setLoading(false);
            setPrompt('')
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
                <input placeholder='create a dog image . . .' type="text" value={prompt} className='border p-1 w-full' onChange={(e) => setPrompt(e.target.value)} />
                <Button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="cursor-pointer border border-rounded p-1 "
                >
                    {loading ? 'Generating...' : 'Create Magic Image'}
                </Button>

                {imagePreview && (
                   <div className='mt-4'>
                   <img 
                       src={imagePreview} 
                       alt="Generated content" 
                       className='h-100 rounded-lg shadow-lg min:w-100 object-cover mx-auto'
                   />
                   <Button 
                       onClick={() => {
                           const link = document.createElement('a');
                           link.href = imagePreview;
                           link.download = 'generated-image.png';
                           link.click();
                       }}
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

export default page