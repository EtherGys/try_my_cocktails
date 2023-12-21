'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';
import Form from '@/components/Form';

export default function EditRecipe() {
    const searchParams = useSearchParams();
    const recipeId = searchParams.get('id');
    const router = useRouter();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState({
        recipe: '',
        tag: ''
    })
    
    useEffect(() => {
        const getRecipeDetails = async () => {
            const response = await fetch(`/api/recipe/${recipeId}`)
            const data = await response.json();
            setPost({
                recipe: data.recipe,
                tag: data.tag
            })
        }
        if (recipeId) getRecipeDetails();
    }, [recipeId])    
    
    const updatePost = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);
        
        if (!recipeId) return alert('Recipe Id not found');
        
        try {
            const response = await fetch(`/api/recipe/${recipeId}`, {
                method: 'PATCH',
                body: JSON.stringify({   
                    recipe: post.recipe,
                    tag: post.tag
                })
            })
            
            if (response.ok) {
                router.push('/profile')
            }
        } catch (error) {
            console.log(error);
            
        } finally {
            setSubmitting(false);
        }
    }
    
    
    return (
        <Form
        type="Modofier"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePost}
        />
        
        
        )
    }
    