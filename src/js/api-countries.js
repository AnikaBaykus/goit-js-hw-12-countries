import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';
import API from './api-service.js';
import getRefs from './get-refs.js';

const refs = getRefs();

refs.searchForm.addEventListener('input', onSearch);



function onSearch(event) {
    
    const searchQuery = event.target.value.trim();
    console.log(searchQuery);

    API.fetchCountryByName(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError);
}





function renderCountryCard(countriesInfo) {
    const markup = countryCardTpl(...countriesInfo);
        console.log(markup);
        refs.countryCard.innerHTML = markup;
};

function onFetchError(error) {
    alert('Упс, что-то не то ввели...')
}

