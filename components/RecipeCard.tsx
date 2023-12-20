"use client"
import {useState} from 'react'
import Image from 'next/image'
import {useSession} from 'next-auth/react'
import {usePathname, useRouter } from 'next/navigation'

interface RecipeCardProps {
    post: any,
    handleTagClick: any,
    handleEdit: any,
    handleDelete: any,
}
export default function RecipeCard({post, handleTagClick, handleEdit, handleDelete}: RecipeCardProps) {
const [copied, setCopied] = useState<string>('')

const handleCopy = () => {
    setCopied(post.recipe);
    navigator.clipboard.writeText(post.recipe);
    setTimeout(() => setCopied(''), 1000)
}

    return (
        <div className='prompt_card'>
        <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
        <Image
        src={post.creator?.image}
        alt='user_image'
        width={40}
        height={40}
        className='rounded-full object-contain'
        />
        <div className='flex flex-col'>
        <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator?.username}</h3>
        <p className='font-inter text-sm text-gray-500'>{post.creator?.email}</p>
        </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
        <Image
        src={copied === post.recipe 
            ? '/assets/icons/check-mark.png'
            : '/assets/icons/paste.png'
        }
        alt=''
        width={12}
        height={12}
        />
        </div>
        </div>
        <p className='my-4 font-satoshi text-sm text-gray-700'>
            {post.recipe}
        </p>
        <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>
            {post.tag}
        </p>
        </div>
        )
    }
    