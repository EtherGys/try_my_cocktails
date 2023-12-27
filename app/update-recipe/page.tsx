'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';
import UpdateForm from '@/components/UpdateForm';

export default function EditRecipe() {
    const searchParams = useSearchParams();
    const recipeId = searchParams.get('id');
    const router = useRouter();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState({
        recipe: '',
        tag: '',
        title: '',
        ingredients: Array()
    })
    const ingredientsValues: string[] = [];

    useEffect(() => {


        const getRecipeDetails = async () => {
            const response = await fetch(`/api/recipe/${recipeId}`)
            const data = await response.json();
            setPost({
                recipe: data.recipe,
                tag: data.tag,
                title: data.title,
                ingredients: data.ingredients
      
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
                    tag: post.tag,
                    title: post.title,
                    ingredients: ingredientsValues
    
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
    console.log('post in page', post);
    
    return (
        <UpdateForm
        type="Modifier"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePost}
        />
        
        
        )
    }
    