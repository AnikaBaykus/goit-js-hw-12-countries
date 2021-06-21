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
    let markup = '';

    if (countriesInfo.length === 1){
        markup = countryCardTpl(...countriesInfo);
        console.log(markup);
        refs.countryResult.innerHTML = markup;
    }
    if (countriesInfo.length > 1 && countriesInfo.length <= 10 ){
        markup = countryListTpl(countriesInfo);
        console.log(markup);
        refs.countryResult.innerHTML = markup;
    }
    
    
};

function onFetchError(error) {
    console.log('Упс, что-то не то ввели...')
}

