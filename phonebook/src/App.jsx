import { useState, useEffect } from "react";
import Notification from "./Notification";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");
  const [message, setMessage] = useState({ mess: "", type: "" });

  useEffect(() => {
    //get request to the json server
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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

    //if name already exists, ask whether to change number
    if (duplicate) {
      if (
        window.confirm(
          `${newPerson.name} is already in phonebook, replace old number with a new one?`
        )
      ) {
        const per = persons.find((per) => per.name === newPerson.name);
        const id = per.id;
        const personToChange = { ...per, number: newPerson.number };

        personsService.update(id, personToChange).then((returnedPerson) => {
          setPersons(
            persons.map((per) =>
              per.id !== returnedPerson.id ? per : returnedPerson
            )
          );
          setMessage({
            mess: `Updated ${returnedPerson.name}'s number`,
            type: "green",
          });
          setTimeout(() => {
            setMessage({ mess: null, type: null });
          }, 3000);
        });
      }
    }

    if (!duplicate) {
      personsService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setMessage({ mess: `Added ${returnedPerson.name} `, type: "green" });
        setTimeout(() => {
          setMessage({ mess: null, type: null });
        }, 3000);
      })//error passd by the backend
       .catch(error => {
        //using default Mongoose error response
        setMessage({
          mess: `${error.response.data.error}`,
          type: "red",
        });
        setTimeout(() => {
          setMessage({ mess: null, type: null });
        }, 3000);
      })
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

  const handleDelete = (id) => {
    const personToDelete = persons.find((per) => per.id === id);

    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personsService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((per) => per.id !== id)))
        .catch((error) => {
          setMessage({
            mess: `The person '${personToDelete.name}' was already deleted from the server.`,
            type: "red",
          });
          setTimeout(() => {
            setMessage({ mess: null, type: null });
          }, 3000);
          setPersons(persons.filter((per) => per.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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

      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
