import RecipeCard from "./RecipeCard"


interface ProfileProps {
  name: any, 
  desc: any, 
  data: any, 
  handleEdit?: any, 
  handleDelete?: any
}

export default function Profile({name, desc, data, handleEdit, handleDelete}: ProfileProps) {
  return (
    <section className='w-full'>
    <h1 className='head_text text-left'>
    <span className='pl-6'>
    {name}
    </span>
    </h1>
    <p className="desc text-left pl-6">
    {desc}
    </p>
    <div className='mt-10 pl-10 prompt_layout'>
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
    