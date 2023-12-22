"use client"
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from '@components/Profile'


import React from 'react'

export default function UserProfile() {
    const [posts, setPosts] = useState<[]>([]);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/profile`);
            const data = await response.json();
            
            setPosts(data);
        }
        fetchPosts();
    }, [])
    
    
    
    return (
        <Profile
        name="Voir le "
        desc="Bienvenu sur le profil"
        data={posts}
        handleEdit={() => {}}
        handleDelete={() => {}}
        />
        )
    }
    
    
    