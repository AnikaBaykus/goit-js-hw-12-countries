const BASE_URL = 'https://restcountries.eu/rest/v2'

function fetchCountries(countryName) {
    return fetch(`${BASE_URL}/name/${countryName}`).then(response => response.json());        
};

export default { fetchCountries };