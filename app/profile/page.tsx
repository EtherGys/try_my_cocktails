"use client"
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from '@components/Profile'


import React from 'react'

export default function MyProfile() {
    const {data: session} = useSession();
    const [posts, setPosts] = useState<[]>([]);
    const router = useRouter();
    
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user?.id}/posts`);
            const data = await response.json();
            
            setPosts(data);
        }
        if (session?.user?.id) fetchPosts();
    }, [])
    
    
    const handleEdit = (post: any) => {
        router.push(`/update-recipe?id=${post._id}`)
        
    }

    const handleDelete = async (post: any) => {
        const hasConfirmed = confirm("Êtes-vous sûr de vouloir supprimer ?")

        if (hasConfirmed) {
            try {
                await fetch(`/api/recipe/${post._id.toString()}`, {
                    method: 'DELETE',
                });

                router.push(`/`)
            } catch (error) {
               console.log(error);
                
            }
        }        
    }
    
    return (
        <Profile
        name="Mon"
        desc="Bienvenue sur votre profil"
        data={posts}
        handleEdit={() => handleEdit}
        handleDelete={() => handleDelete}
        />
        )
    }
    
    
    