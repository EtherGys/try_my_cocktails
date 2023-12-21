
'use client'
import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard';

interface RecipeCardListProps {
    data: any,
    handleTagClick: any,
}


const RecipeCardList = ({data, handleTagClick}: RecipeCardListProps) => {
    return (
        <div className='mt-16 prompt_layout'>
        {data.map((post: any) => (
            <RecipeCard
            key={post.id}
            post={post}
            handleTagClick={handleTagClick}
            handleEdit={() => {}}
            handleDelete={() => {}}
            />
        ))}
        </div>
        )
    }
    
    export default function Feed() {
        const [searchText, setSearchText] = useState<string>('');
        const [posts, setPosts] = useState<[]>([]);
        
        const handleSearchChange = (e: any) => {
            
        }
        
        useEffect(() => {
            const fetchRecipes = async () => {
                const response = await fetch('/api/recipe');
                const data = await response.json();

                setPosts(data);
            }

            fetchRecipes();
        }, [])
        
        return (
            <section className='feed'>
            <form 
            className='relative <-full flex-center'
            >
            <input 
            type="text" 
            placeholder='Search for a tag or username'
            value={searchText}
            onChange={handleSearchChange}
            required
            className='search_input peer'
            />
            </form>
            <RecipeCardList
            data={posts}
            handleTagClick={() => {}}
            />
            </section>
            )
        }
        
        