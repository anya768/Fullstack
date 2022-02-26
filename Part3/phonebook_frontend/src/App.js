import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import personService from './services/persons'
import { useState, useEffect } from 'react'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState({})
  const [showNotification, setShowNotification] = useState(false)
 
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const displayNotification = (message, error = false) => {
    setShowNotification(true)
    setNotification({message,error})
    setTimeout(()=>setShowNotification(false), 3000)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, phone: newPhone
    }
    if (newName === '' || newPhone === '') {
      return alert(`Please, fill in the form`)
    }
   /*  if (persons.find(person => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`)
    } */

    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to the phonebook, do you want to update their number?`)) {
        return personService
          .update(existingPerson.id,personObject)
          .then(returnedPerson => {
            const personsCopy = [...persons]
            personsCopy[personsCopy.findIndex((person)=>person.name === newName)] = returnedPerson;
            setPersons(personsCopy)
            setNewName('')
            setNewPhone('')
            setNameFilter('');
            displayNotification(
              `Phone number of ${returnedPerson.name} has been updated!`
            );
          }).catch(e => {
             displayNotification( `Information of ${existingPerson.name} has already been removed from server`, true);
          })
      }
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewPhone('')
        setNameFilter('');
        displayNotification( `Added ${returnedPerson.name} to the phonebook!`);
      }).catch(e => {
        displayNotification(e.response.data.error, true);
      })
  }

  const deletePhone = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Are you sure that you want to delete ${person.name}?`))
      personService.deletePhone(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
          displayNotification( `Removed ${person.name} from the phonebook!`);
        })
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }
  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(nameFilter));
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />
      <h2>Add a new person</h2>
      {showNotification? <Notification notification={notification} /> : ''}
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
        newPhone={newPhone} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Person personsFiltered={personsFiltered} deleteHandler={deletePhone} />
    </div>
  )
}

export default App
