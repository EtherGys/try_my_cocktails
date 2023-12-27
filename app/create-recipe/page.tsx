'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Form from '@/components/Form';

export default function CreateRecipe() {
  const {data: session} = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState({
    recipe: '',
    tag: '',
    title: '',
    ingredients: Array()
  })
  
  
  const ingredientsValues: string[] = [];
  let tags: string[] = [];
  const char = ',';
  
  const createPost = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    post.ingredients.forEach(element => ingredientsValues.push(element.value));
    
    const tagsArray: string[] = post.tag.split(char)
    tagsArray.forEach((str, i) => tagsArray[i] = str.trim())
    
    try {
      const response = await fetch('/api/recipe/new', {
        method: 'POST',
        body: JSON.stringify({   
          recipe: post.recipe,
          userId: session?.user?.id,
          tag: tagsArray,
          title: post.title,
          ingredients: ingredientsValues
        })
      })
      
      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error);
      
    } finally {
      setSubmitting(false);
    }
  }
  
  
  
  return (
    <Form
    type="Créer"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPost}
    />
    
    
    )
  }
  