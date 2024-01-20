import { useState } from "react";
import Person from "./Person";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    console.log("event target  ", event.target);

    //check whether the name exists in the phonebook
    const newPerson = {
      name: newName,
    };

    const duplicate = persons.some((per) => per.name === newPerson.name);

    if (!duplicate) {
      setPersons(persons.concat(newPerson));
      setNewName("");
    } else {
      alert(`${newPerson.name} is already in the phonebook`);
    }
  };

  const handleChange = (event) => {
    console.log("event target ", event.target);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((per) => (
          <Person key={per.name} person={per} />
        ))}
      </ul>
    </div>
  );
};

export default App;
