import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const User = () => {


// useParams to get the id 
// useSelector to get the users state
// find the user which mataches the id
// display the blogs of this user,   an unordered list

 const users = useSelector(state => state.users)
 const id = useParams().id
 const user = users.find(u => u.id === id)

    if(!user){
        return null
    }

    return(
     <>
        <h3>added blogs</h3>
       <ul>
        {user.blogs
        .map(blog => {
            return (
                <li key={blog.id}>
                 {blog.title}
                </li>
            )
        })
        }

       </ul>
     </>
    )
}


export default User
