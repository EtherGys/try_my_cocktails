"use client"
import Link from 'next/link'
import { useState, useEffect, use } from 'react'

export default function UpdateForm({type, post, setPost, submitting, handleSubmit}: formProps) {
    const [arr, setArr] = useState<string[]>(post.ingredients);
    const [selectedImage, setSelectedImage] = useState();
    
    useEffect(() => {
        setArr(post.ingredients);
    }, [post.ingredients, post.ingredients.length])
    
    const addInput = () => {
        arr.push('');
        setArr((s: any) => {
            const lastId = s[s.length - 1].id;
            return [
                ...s,
                {
                    type: "text",
                    value: ""
                }
            ];
        });
        
    };
    
    const imageChange = (e: any) => {
        setPost({
            ...post, file: e.target.files[0]
        })
        setSelectedImage(e.target.files[0]);
    };
    
    const handleChange = (e: any) => {
        e.preventDefault();
        
        const index = e.target.id;
        setArr(s => {
            const newArr = s.slice();
            newArr[index] = e.target.value;
            post.ingredients = newArr;
            return post.ingredients;
        });
    };
    
    async function removeSelectedImage() {
        setSelectedImage(undefined);
        post.file = new File([], "fileName");
    };
        
    return (
        <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
        <span className='blue_gradient'>
        {type} votre recette
        </span>
        </h1>
        <p className='desc text-left max-w-md'>
        {type} et partager vos recettes préférées
        </p>
        
        <form 
        onSubmit={handleSubmit}
        className='mt-10 w-full m-w-2xl flex flex-col gap-7 glassmorphism'
        >
        {/* Title */}
        <label htmlFor="">
        <span className='font-satoshi font-semibold text-base text-gray-700'>
        Nom du cocktail 
        </span>
        <input 
        value={post.title} 
        onChange={(e) => setPost({
            ...post, title: e.target.value
        })} 
        name="title_input" 
        id="title_input"
        placeholder='Bloody Mary, Daiquiri, ...'
        required
        className='form_input border border-gray-300'
        ></input>
        </label>
        
        {/* Ingredients */}
        <div className=''>
        <button type='button' className='border border-gray-300 w-12 h-12 rounded-full' onClick={addInput}>+</button>
        
        <div className='w-[250px]'>
        <span className='font-satoshi font-semibold text-base text-gray-700'>
        Ingrédients
        </span>
        {arr.map((ingredient: any, index: number) => {
            return (
                <input
                onChange={handleChange} 
                value={ingredient}
                className='form_input border border-gray-300 w-[150px]'
                key={index}
                id={index.toString()}
                type={ingredient.type}
                size={20}
                />
                )})}
                </div>
                </div>
                
                {/* Recipe */}
                <label htmlFor="">
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                Votre recette
                </span>
                <textarea 
                value={post.recipe} 
                onChange={(e) => setPost({
                    ...post, recipe: e.target.value
                })} 
                name="" 
                id=""
                placeholder='Écrivez les étapes de la recette'
                required
                className='form_textarea border border-gray-300'
                ></textarea>
                </label>
                
                {/* Tag */}
                <label htmlFor="">
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                Tags
                <span className='font-normal'> (vodka, jus de citron)</span>
                </span>
                <input 
                value={post.tag} 
                onChange={(e) => setPost({
                    ...post, tag: e.target.value
                })} 
                name="" 
                id=""
                placeholder='#Tag'
                required
                className='form_input border border-gray-300'
                ></input>
                </label>
                
                 {/* Cover image */}
            <div className="w-[40%]">
            <label htmlFor="cover-photo" className="font-satoshi font-semibold text-base text-gray-700">Image de couverture</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
            {selectedImage ?
                (
                    <div className='text-center'>
                    <div className='flex justify-center'>
                    <figure className="max-w-lg">
                    <img className="object-cover h-80 w-96 rounded-lg" src={URL.createObjectURL(selectedImage)} alt="image de couverture de la recette"/>
                    </figure>
                    </div>
                    <button type="button" onClick={removeSelectedImage} className="text-gray-900 mt-4 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Supprimer l'image</button>
                    </div>
                    ) : (
                        <img className="object-cover h-80 w-96 rounded-lg" src={post.file_url} alt="image de couverture de la recette"/>

                        
                        )}
                        <div className="mt-4 flex text-sm justify-center leading-6 text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Sélectionner un fichier</span>
                        <input id="file-upload" name="file-upload" accept="image/*" type="file" className="sr-only" onChange={imageChange}/>
                        </label>
                        <p className="pl-1">ou glisser-déposer</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG ou JPG jusqu'à 10MB</p>
                        </div>
                        </div>
                        </div> 
                
                
                
                
                <div className='flex-end mx-3 mb-5 gap-4'>
                <Link href='/' className='text-gray-500 text-sm'>Annuler</Link>
                <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
                {submitting ? `${type}...` : type}
                </button>
                </div>
                
                
                </form>
                </section>
                )
            }
            