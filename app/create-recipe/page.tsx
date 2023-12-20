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
    tag: ''
  })
  
  const createPost = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('api/recipe/new', {
        method: 'POST',
        body: JSON.stringify({   
          recipe: post.recipe,
          userEmail: session?.user?.email,
          tag: post.tag
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
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPost}
    />
    
    
    )
  }
  