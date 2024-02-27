/*
useSelector to get the users state

return a table
forEach user -> return <User />>
pass key = user.id

*/
import User from "./User";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {

    const users = useSelector(state => state.users)

    return(
        <>
       <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr>
                        <td> <Link to={`/users/${user.id}`}>{user.username}</Link></td>
                        <td>{user.blogs.length}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>

     
    )
}


export default Users