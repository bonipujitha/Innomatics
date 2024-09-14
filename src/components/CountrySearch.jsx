import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import countryData from '../countryData'; // Import the data

const CountrySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredSuggestions = countryData.filter(
        country => country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   country.capital.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div className="container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Type a country or capital..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">
          <Search />
        </button>
      </div>
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((country, index) => (
            <div key={index} onClick={() => handleSelectCountry(country)} className="suggestion-item">
              <div>{country.country}</div>
              <div>Capital: {country.capital}</div>
            </div>
          ))}
        </div>
      )}
      {selectedCountry && (
        <div className="country-details">
          <h2>{selectedCountry.country}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Population: {selectedCountry.population.toLocaleString()}</p>
          <p>
            Language(s): {Array.isArray(selectedCountry.official_language)
              ? selectedCountry.official_language.join(', ')
              : selectedCountry.official_language}
          </p>
          <p>Currency: {selectedCountry.currency}</p>
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
