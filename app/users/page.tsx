"use client"
import { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation";
import Profile from '@components/Profile'


import React from 'react'

export default function MyProfile() {
    const searchParams = useSearchParams();
    const userId = searchParams.get('id');
    const [user, setUser] = useState<any>({});
    const [posts, setPosts] = useState<[]>([]);
    
    
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/users/${userId}`);
            const data = await response.json();
            
            setUser(data);
        }
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();
            
            setPosts(data);
        }
        
        if (userId) {
            fetchUser();
            fetchPosts();
        }
    }, [userId])    
    
    return (
        <div>
        <Profile
        name={`Profil de ${user.username}`}
        desc="Bienvenue sur ce profil"
        data={posts}
        />
        </div>
        )
    }
    
    
    