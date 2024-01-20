import { useState } from "react";
import Person from "./Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    console.log("event target  ", event.target);

    //check whether the name exists in the phonebook
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const duplicate = persons.some((per) => per.name === newPerson.name);

    if (!duplicate) {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newPerson.name} is already in the phonebook`);
    }
  };

  const handleChange = (event) => {
    console.log("event target ", event.target);
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    console.log("event target ", event.target);
    setNewNumber(event.target.value);
  };

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value);
  };

  const phonesToShow =
    filter.length === 0
      ? persons
      : persons.filter((per) =>
          per.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with <input value={filter} onChange={handleChangeFilter} />
      </div>

      <h4>Add a new</h4>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {phonesToShow.map((per) => (
          <Person key={per.name} person={per} />
        ))}
      </ul>
    </div>
  );
};

export default App;
