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
  const ingredientsValues: string[] = [];
  const char: string = ',';
  const [post, setPost] = useState({
    recipe: '',
    tag: '',
    title: '',
    ingredients: Array(),
    file: new File([], "fileName")
  })
  
  
  const createPost = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    post.ingredients.forEach(element => ingredientsValues.push(element.value));
    
    const tagsArray: string[] = post.tag.split(char)
    tagsArray.forEach((str, i) => tagsArray[i] = str.trim())
    
    const formData = new FormData()
    formData.append('file', post.file);
    formData.append('upload_preset', 'my-uploads');
    const data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  }).then(res => res.json())
  
  
  if (data.secure_url) {
    try {
      const response = await fetch('/api/recipe/new', {
        method: 'POST',
        body: JSON.stringify({   
          recipe: post.recipe,
          userId: session?.user?.id,
          tag: tagsArray,
          title: post.title,
          ingredients: ingredientsValues,
          file_url: data.secure_url,
          file_public_id: data.public_id.replace("my-uploads/", "")
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
