import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';
import API from './fetchCountries.js';
import getRefs from './get-refs.js';

import "@pnotify/core/dist/BrightTheme";
import { alert, error, defaultModules } from "@pnotify/core/dist/PNotify";



const refs = getRefs();

var debounce = require('lodash.debounce');

refs.searchForm.addEventListener('input', debounce(onSearch, 500));



function onSearch(event) {
    
    const searchQuery = event.target.value.trim();
    console.log(searchQuery);


    API.fetchCountries(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError)
        .finally();
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
    if (countriesInfo.length > 10){
        error({
            text: "Please enter more characters.",
            delay: 500,
            title: "Oops! Too many results."
        })
    }
    
};

function onFetchError(error) {
    console.log(error)
};

