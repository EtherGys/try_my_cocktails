"use client"
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from '@components/Profile'


import React from 'react'

export default function MyProfile() {
    const {data: session} = useSession();
    const [posts, setPosts] = useState<[]>([]);
    
    console.log('profile id', session?.user?.id);
    console.log('profile SESSION', session);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user?.id}/posts`);
            const data = await response.json();
            
            setPosts(data);
        }
        if (session?.user?.id) fetchPosts();
    }, [])
    
    
    const handleEdit = () => {
        
    }
    const handleDelete = () => {
        
    }
    
    return (
        <Profile
        name="My"
        desc="Bienvenu sur votre profil"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />
        )
    }
    
    
    