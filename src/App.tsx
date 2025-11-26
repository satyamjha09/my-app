
import React, { useEffect, useState, type ChangeEvent } from 'react'

const App = () => {

  interface Country {
    name: {
      common: string;
    }
    code: string;
  }

  const [query, setQuery] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [filtered, setFiltered] = useState<Country[]>([]);


   useEffect(() => {
    const fetchCountries = async () => {
      try{
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const data: Country[] = await response.json();
        setCountries(data)

      } catch(error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();

   },[]);

   useEffect(() => {
    if(!query.trim() || query.trim().length < 2) {
      setFiltered([]);
      return;
    }

    const match = countries.filter((c) => 
      c.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(match);
   },[query, countries]);


   const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
   }

   const handleSelectCountry = (country: string) => {
    setQuery(country);
    setFiltered([]);
   }

  return (
    <div>
      <input type="text"
        placeholder='country..'
        value={query}
        onChange={handleInput}
      />


      <div>

        {
          filtered.map((c) => (
            <div key={c.name.common}
            onClick={() => handleSelectCountry(c.name.common)}
            >
             {c.name.common}

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default App