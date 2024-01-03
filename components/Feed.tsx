
'use client'
import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard';
import { useRouter } from "next/navigation";
import { Router } from 'tabler-icons-react';


interface RecipeCardListProps {
    data: any,
    handleTagClick: any,
    handleUsernameClick?: any
}


const RecipeCardList = ({data, handleTagClick, handleUsernameClick}: RecipeCardListProps) => {


    return (
        <div className='mt-16 prompt_layout'>
        {data.map((post: any) => (
            <RecipeCard
            key={post.id}
            post={post}
            handleTagClick={handleTagClick}
            handleUsernameClick={handleUsernameClick}
            handleEdit={() => {}}
            handleDelete={() => {}}
            />
            ))}
            </div>
            )
        }
        
        export default function Feed() {
            const [posts, setPosts] = useState<[]>([]);
            const router = useRouter();

            
            // Search states
            const [searchText, setSearchText] = useState<string>('');
            const [searchTimeout, setSearchTimeout] = useState<string | number | Timeout | undefined>(null);
            const [searchResults, setSearchResults] = useState<[]>([]);
            
            const filterRecipes = (searchedText: string) => {
                const regex = new RegExp(searchedText, 'i');
                return posts.filter(
                    (item: any) =>
                    
                    regex.test(item.creator.username) ||
                    regex.test(item.tag) ||
                    regex.test(item.title)
                    )
                }
                
                
                const handleSearchChange = (e: any) => {
                    clearTimeout(searchTimeout);
                    setSearchText(e.target.value);
                    
                    setSearchTimeout(() => {
                        setTimeout(() => {
                            const result: any = filterRecipes(e.target.value);
                            
                            setSearchResults(result);
                        }, 500);
                    })
                }
                
                const handleTagClick = (tagName: string) => {
                    setSearchText(tagName);
                    
                    const result: any = filterRecipes(tagName);
                    setSearchResults(result);
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
                    className='relative w-7/12 flex-center'
                    >
                    <input 
                    type="text" 
                    placeholder='Recherche par nom, tag ou pseudo'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                    />
                    </form>
                    {searchText ? (
                        
                        <RecipeCardList
                        data={searchResults}
                        handleTagClick={handleTagClick}
                        />
                        ) : (
                            <RecipeCardList
                            data={posts}
                            handleTagClick={handleTagClick}
                            />
                            )}
                            </section>
                            )
                        }
                        
                        