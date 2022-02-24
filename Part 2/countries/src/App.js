import Country from './components/Country'
import Filter from './components/Filter'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const countriesFiltered = countries.filter(country => country.name.common.toLowerCase().includes(nameFilter.toLowerCase()));
  
  return (
    <div>
      <h2>Countries</h2>
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />
      <Country countries={countriesFiltered} selectCountry={handleNameFilterChange} />
    </div>
  )
}

export default App