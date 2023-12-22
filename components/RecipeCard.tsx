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
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    
    const handleCopy = () => {
        setCopied(post.recipe);
        navigator.clipboard.writeText(post.recipe);
        setTimeout(() => setCopied(''), 1000)
    }
    
    return (
        <div className='prompt_card'>
        <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
        
        <div className='flex flex-col'>
        <h3 className='font-satoshi font-semibold text-gray-900 text-2xl'>{post.title}</h3>
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
        <table className="mt-4 table-fixed font-satoshi border border-slate-300 w-full">
        <thead>
        <tr>
        <th className='pl-4 text-left'>Ingrédients</th>
        </tr>
        </thead>
        <tbody>
        {post.ingredients.map((ingredient: any) => (
            <tr>
            <td className='pl-8 border border-slate-300'>{ingredient}</td>
            </tr>
            ))}
        </tbody>
        </table>

            <p className='my-4 font-satoshi text-lg text-gray-700'>
            {post.recipe}
            </p>
            {post.tag.length > 1 ? (
            <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>
            #{post.tag}
            +1
            </p>
            ) : (
            <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>
            #{post.tag}
            -1
            </p>
            )
            }
            <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
            <Image
            src={post.creator?.image}
            alt='user_image'
            width={40}
            height={40}
            className='mt-10 rounded-full object-contain'
            />
            <div className='flex flex-col'>
            <h3 className='mt-10 font-satoshi font-semibold text-gray-900'>{post.creator?.username}</h3>
            {/* <p className='font-inter text-sm text-gray-500'>{post.creator?.email}</p> */}
            </div>
            </div>
            {session?.user?.id === post.creator_id && pathName === '/profile' && (
                <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                <p
                className='font-inter text-sm green_gradient cursor-pointer'
                onClick={() => handleEdit && handleEdit(post)}
                >
                Modifier
                </p>
                <p
                className='font-inter text-sm orange_gradient cursor-pointer'
                onClick={() => handleDelete && handleDelete(post)}
                >
                Supprimer
                </p>
                </div>
                )}
                </div>
                )
            }
            