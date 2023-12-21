"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, getProviders, useSession, LiteralUnion, ClientSafeProvider} from 'next-auth/react'
import BuiltInProviderType from "next-auth/providers/google"


export function NavBar() {
    const {data: session} = useSession();

    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
    
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])
    
    return (
        <nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
        <Image className='object-contain' src='/assets/icons/martini.png' alt='logo' width={30} height={30}/>
        {/* remove for sm devices */}
        <p className='logo_text'>Try my cocktails</p>
        </Link>
        {/* Desktop navigation */}
        <div className='sm:flex hidden'>
        {
            session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                <Link href='/create-recipe' className='black_btn'>Create recipe</Link>
                <button className='outline_btn' onClick={() => {
                                signOut();
                            }}>Sign out</button>
                <Link href='/profile' className='black_bt'>
                <Image src={session?.user.image?.toString() || ''} alt='profile' width={37} height={37}/>
                </Link>
                </div>
                ) : 
                <>
                {providers && 
                    Object.values(providers).map((provider) => (
                        <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                        Sign In
                        </button>
                        ))}
                        </>
                    }
                    </div>
                    
                    {/* Mobile navigation */}
                    <div className='sm:hidden flex relative'>
                    { session?.user ? (
                        // burger menu
                        <div className='flex'>
                        <Image src={session?.user.image?.toString() || ''} alt='profile' width={37} height={37} onClick={() => {setToggleDropdown((prev) => !prev)}}/>
                        {toggleDropdown && (
                            <div className='dropdown'>
                            <Link href='/profile' className='dropdown_link' onClick={() => {setToggleDropdown(false)}}>
                            My profile
                            </Link>
                            <Link href='/create-recipe' className='dropdown_link' onClick={() => {setToggleDropdown(false)}}>
                            Create recipe
                            </Link>
                            <button type='button' onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                            }} className='mt-5 w-full black_btn'>
                            Sign out
                            </button>
                            </div>
                            )}
                            </div>
                            
                            ) : (
                                <>
                                {providers && 
                                    Object.values(providers).map((provider) => (
                                        <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                        Sign In
                                        </button>
                                        ))}</>
                                        )
                                    }
                                    </div>
                                    
                                    </nav>
                                    )
                                }
                                
                                
                                