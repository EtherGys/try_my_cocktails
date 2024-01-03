
interface PostProps {
    title: string,
    creator: UserProps,
    _id: string,
    creator_id: string,
    recipe: string,
    ingredients: string[],
    tag: string[],
    added_date: Date
}

interface UserProps {
    _id: string,
    email: string,
    id: string,
    image: any,
    username: string,
}

interface RecipeCardProps {
    post: PostProps,
    handleTagClick?: any,
    handleEdit?: any,
    handleDelete?: any,
    handleUsernameClick?: any
}

interface formProps {
    type: string,
    post: any, 
    setPost: any, 
    submitting: any, 
    handleSubmit: any
}

interface RecipeCardListProps {
    data: any,
    handleTagClick?: any,
    handleUsernameClick?: any
}

interface DBProps {
    params: any
}

interface ProfileProps {
    name: string, 
    desc: any, 
    data: any, 
    handleEdit?: any, 
    handleDelete?: any
  }