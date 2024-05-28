import { useQuery, useMutation  } from "@apollo/client"
import { ALL_AUTHORS,EDIT_YEAR } from "../queries"
import { useState } from "react";

const Authors = (props) => {
 
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const result = useQuery(ALL_AUTHORS)
  const [editYear] = useMutation(EDIT_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.error("Error editing author:", error);
    },
    onCompleted: (data) => {
      console.log("Edit author completed:", data);
    }
  });

  if (!props.show) {
    return null
  }

  if(result.loading){
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors;

  const submit = async (event) => {
    event.preventDefault();
    console.log('Submitting:', { name, setBornTo: parseInt(born) });
    try {
      await editYear({ variables: { name, setBornTo: parseInt(born) } });
    } catch (error) {
      console.error("Error submitting edit author:", error);
    }
    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name 
            <select value={name} onChange={({ target }) => setName(target.value)}>
              <option value="">Select author</option>
              {authors.map(a => 
                <option key={a.name} value={a.name}>{a.name}</option>
              )}
            </select>
          </div>
          <div>
            born 
            <input 
              type="number"
              value={born}
              onChange={({ target }) => setBorn(parseInt(target.value))}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>

    </div>

    
  )
}

export default Authors
