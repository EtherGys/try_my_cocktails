import RecipeCard from "./RecipeCard"


interface ProfileProps {
  name: any, 
  desc: any, 
  data: any, 
  handleEdit: any, 
  handleDelete: any
}

export default function Profile({name, desc, data, handleEdit, handleDelete}: ProfileProps) {
  return (
    <section className='w-full'>
    <h1 className='head_text text-left'>
    <span className='blue_gradient'>
    {name} Profil
    </span>
    </h1>
    <p className="desc text-left">
    {desc}
    </p>
    <div className='mt-10 prompt_layout'>
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
    