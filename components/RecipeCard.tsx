"use client"
import {useState} from 'react'
import Image from 'next/image'
import {useSession} from 'next-auth/react'
import {usePathname, useRouter } from 'next/navigation'


export default function RecipeCard({post, handleTagClick, handleEdit, handleDelete, handleUsernameClick}: RecipeCardProps) {
    const [copied, setCopied] = useState<string>('')
    const { data: session } = useSession();
    const pathName = usePathname();
    
    const handleCopy = () => {
        setCopied(post.recipe);
        navigator.clipboard.writeText(post.recipe);
        setTimeout(() => setCopied(''), 1000)
    }
    
    const createdDate = new Date(post.added_date).toLocaleString();
    
    return (
        <div className='prompt_card'>
        <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3'>
        
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
        <th className='pl-4 text-left py-1'>Ingrédients</th>
        </tr>
        </thead>
        <tbody>
        {post.ingredients.map((ingredient: any) => (
            <tr>
            <td className='pl-8 py-2 border border-slate-300'>{ingredient}</td>
            </tr>
            ))}
            </tbody>
            </table>
            <p className='my-4 font-satoshi text-lg text-gray-700'>
            {post.recipe}
            </p>
            <div className='flex'>
            {post.tag.map((el: string, i: number) => (
                <p className='font-inter mx-2 text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(el)}>
                #{post.tag[i]}         
                </p>
                ))}
                </div>
                <div onClick={() => handleUsernameClick && handleUsernameClick(post.creator?.email)} className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
                <Image
                src={post.creator?.image}
                alt='user_image'
                width={40}
                height={40}
                className='mt-10 rounded-full object-contain'
                />
                <div className='flex flex-col'>
                <h3 className='mt-10 font-satoshi font-semibold text-gray-900'>{post.creator?.username}</h3>
                </div>
                </div>
                <div className='font-sm text-right text-gray-400'>
                {createdDate}
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
                