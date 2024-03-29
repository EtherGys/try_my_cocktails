"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, getProviders, useSession, LiteralUnion, ClientSafeProvider} from 'next-auth/react'
import BuiltInProviderType from "next-auth/providers/google"
// import { BuiltInProviderType } from "next-auth/providers";


export function NavBar() {
    const {data: session} = useSession();

    const [providers, setProviders] = useState<any>(null);
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
    
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])
    
    return (
        <nav className='mx-4 flex-between mb-16 pt-3'>
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
                <Link href='/create-recipe' className='black_btn'>Ajouter un cocktail</Link>
                <button className='outline_btn' onClick={() => {
                                signOut();
                            }}>Déconnexion</button>
                <Link href='/profile' className='black_bt'>
                <Image src={session?.user.image?.toString() || ''} alt='profile' width={37} height={37}/>
                </Link>
                </div>
                ) : 
                <>
                {providers && 
                    Object.values(providers).map((provider: any) => (
                        <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                        Connexion
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
                            Mon profil
                            </Link>
                            <Link href='/create-recipe' className='dropdown_link' onClick={() => {setToggleDropdown(false)}}>
                            Ajouter un cocktail
                            </Link>
                            <button type='button' onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                            }} className='mt-5 w-full black_btn'>
                            Déconnexion
                            </button>
                            </div>
                            )}
                            </div>
                            
                            ) : (
                                <>
                                {providers && 
                                    Object.values(providers).map((provider: any) => (
                                        <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                        Connexion
                                        </button>
                                        ))}</>
                                        )
                                    }
                                    </div>
                                    
                                    </nav>
                                    )
                                }
                                
                                
                                