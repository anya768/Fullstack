import React from 'react'
import CountryView from './CountryView'

const Country = ({ countries, selectCountry }) => {
    if (countries.length === 1) {
        return (
            <CountryView country={countries[0]}/>
        )
    }
    else if (countries.length <= 10) {
        return (
            <div>
                <ul>
                    {countries.map(country => 
                    <li key={country.name.common}>{country.name.common}
                      <button onClick={selectCountry} value={country.name.common}>Show</button>
                    </li>
                    )}
                </ul>
            </div>
        )
    }


    return (
        <p>Too many matches, specify another filter</p>
    )

}

export default Country