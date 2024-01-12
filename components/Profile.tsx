import RecipeCard from "./RecipeCard"


export default function Profile({name, desc, data, handleEdit, handleDelete}: ProfileProps) {
  return (
    <section className='w-full'>
    <h1 className='head_text text-left'>
    <span className='mx-2 md:pl-6'>
    {name}
    </span>
    </h1>
    <p className="desc text-left pl-6">
    {desc}
    </p>
    <div className='mt-10 mx-4 md:pl-10 prompt_layout'>
    {data.map((post: any) => (
      <RecipeCard
      key={post.id}
      post={post}
      handleEdit={handleEdit && handleEdit(post)}
      handleDelete={handleDelete && handleDelete(post)}
      />
      ))}
      </div>      
      </section>
      )
    }
    