import Link from 'next/link'

interface formProps {
    type: any,
    post: any, 
    setPost: any, 
    submitting: any, 
    handleSubmit: any
}

export default function Form({type, post, setPost, submitting, handleSubmit}: formProps) {
    return (
        <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
        <span className='blue_gradient'>
        
        {type} Post
        </span>
        </h1>
        <p className='desc text-left max-w-md'>
        {type} and share
        </p>
        
        <form 
        onSubmit={handleSubmit}
        className='mt-10 w-full m-w-2xl flex flex-col gap-7 glassmorphism'
        >
        <label htmlFor="">
        <span className='font-satoshi font-semibold text-base text-gray-700'>
        your ai prompt
        </span>
        <textarea 
        value={post.prompt} 
        onChange={(e) => setPost({
            ...post, prompt: e.target.value
        })} 
        name="" 
        id=""
        placeholder='Write your post here'
        required
        className='form_textarea'
        ></textarea>
        </label>
        <label htmlFor="">
        <span className='font-satoshi font-semibold text-base text-gray-700'>
        Tag 
        <span className='font-normal'>(#product, #alcohol)</span>
        </span>
        <input 
        value={post.tag} 
        onChange={(e) => setPost({
            ...post, tag: e.target.value
        })} 
        name="" 
        id=""
        placeholder='#tag'
        required
        className='form_input'
        ></input>
        </label>
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
    