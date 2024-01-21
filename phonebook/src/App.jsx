import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");

  useEffect(() => {
    //get request to the json server
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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

  const handleChangeName = (event) => {
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handler={handleChangeFilter} />
      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
