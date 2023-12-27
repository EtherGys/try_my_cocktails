"use client"
import Link from 'next/link'
import { useState } from 'react'



export default function Form({type, post, setPost, submitting, handleSubmit}: formProps) {
    const inputArr = [
        {
            type: "text",
            id: 1,
            value: ""
        }
    ];
    
    const [arr, setArr] = useState(inputArr);
    
    const addInput = () => {
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
    
    const handleChange = (e: any) => {
        e.preventDefault();
        
        const index = e.target.id;
        setArr(s => {
            const newArr = s.slice();
            newArr[index].value = e.target.value;

            post.ingredients = newArr;
            return post.ingredients;
        });
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
        name="" 
        id=""
        placeholder='Bloody Mary, Daiquiri, ...'
        required
        className='form_input border border-gray-300'
        ></input>
        </label>
        
        {/* Ingredients */}
        <div className=''>
        
        <button className='border border-gray-300 w-12 h-12 rounded-full' onClick={addInput}>+</button>
        <div className='w-[250px]'>
        <span className='font-satoshi font-semibold text-base text-gray-700'>
        Ingrédients
        </span>
        <span className='font-normal text-sm'> ("15ml de vodka", "5ml de jus de citron")</span>
        
        {arr.map((item, i) => {
            return (
                <input
                onChange={handleChange}
                value={item.value}
                className='form_input border border-gray-300 w-[150px]'
                
                id={i.toString()}
                type={item.type}
                size={20}
                />
                );
            })}
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
            Tag
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
            <div className='flex-end mx-3 mb-5 gap-4'>
            <Link href='/' className='text-gray-500 text-sm'>Annuler</Link>
            <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
            {submitting ? `${type}...` : type}
            </button>
            </div>
            
            <div className="col-span-full">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Image de couverture</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
            </svg>
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
            <span>Sélectionner un fichier</span>
            <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
            </label>
            <p className="pl-1">ou glisser-déposer</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG ou JPG jusqu'à 10MB</p>
            </div>
            </div>
            </div>
            
            
            </form>
            </section>
            )
        }
        