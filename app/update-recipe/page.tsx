'use client'
import React from 'react'
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
        ingredients: Array(),
        file_url: '',
        public_id: '',
        file: new File([], "fileName")
    })
    const ingredientsValues: string[] = [];
    const char: string = ',';
    
    useEffect(() => {
        const getRecipeDetails = async () => {
            const response = await fetch(`/api/recipe/${recipeId}`)
            const data = await response.json();
            setPost({
                recipe: data.recipe,
                tag: data.tag,
                title: data.title,
                ingredients: data.ingredients,
                file_url: data.file_url,
                public_id: data.file_public_id,
                file: new File([], "fileName")
            })
        }
        if (recipeId) getRecipeDetails();
    }, [recipeId])
    
    const updatePost = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);
        post.ingredients
        .filter((str: string) => str !== '')
        .forEach(element => { ingredientsValues.push(element) });
        
        const stringTag = post.tag.toString()
        const tagsArray: string[] = stringTag.split(char)
        tagsArray.forEach((str, i) => tagsArray[i] = str.trim())
        
        if (!recipeId) return alert('Recipe Id not found');
        
    const formData = new FormData()
    formData.append('file', post.file);
    formData.append('upload_preset', 'my-uploads');
    
    const data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
}).then(res => res.json())

if (data.secure_url) {
    try {
        const response = await fetch(`/api/recipe/${recipeId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                recipe: post.recipe,
                tag: tagsArray,
                title: post.title,
                ingredients: ingredientsValues,
                file_url: data.secure_url,
                file_public_id: data.public_id.replace("my-uploads/", "")
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
}

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
