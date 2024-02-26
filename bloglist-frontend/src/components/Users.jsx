/*
useSelector to get the users state

return a table
forEach user -> return <User />>
pass key = user.id

*/
import User from "./User";
import { useSelector } from "react-redux";

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
                {users.map(user => (
                    <tbody key={user.id}> 
                        <User user={user}/>
                    </tbody>
                ))}
            </table>
        </>

     
    )
}


export default Users