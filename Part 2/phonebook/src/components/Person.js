import React from 'react'

const Person = ({ personsFiltered, deleteHandler }) => {
  return (
    <ul>
      {personsFiltered.map(person =>
        <li key={person.name}>{person.name} {person.phone} 
        <button onClick={() => deleteHandler(person.id)}>delete</button></li>
      )}
    </ul>
  )
}

export default Person