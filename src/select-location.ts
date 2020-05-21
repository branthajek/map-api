
import axios from 'axios';
import * as Constants from './constants';
import { States, OregonCounties, WashingtonCounties } from './datasets';
import { PlacesResponse } from './types';
import { GOOGLE_API_KEY } from './api-keys';

const defaultStateOption = document.createElement('option');
const defaultCountyOption = document.createElement('option');
let selectedState: string;
let enteredLocation: string;

function populateStates() {
    defaultStateOption.text = '';
    Constants.stateDropdown.length = 0;
    Constants.stateDropdown.add(defaultStateOption);
    for (let state of States) {
        let el = document.createElement("option");
        el.textContent = state;
        el.value = state;
        Constants.stateDropdown.appendChild(el);
    }
};
populateStates();

function refreshCounties() {
    defaultCountyOption.text = '';
    Constants.countyDropdown.length = 0;
    Constants.countyDropdown.add(defaultCountyOption);
}

function stateSelectHandler() {
    alert('selection changed');

    selectedState = Constants.stateDropdown.value;

    function populateCounties() {
        if (selectedState == "OR") {
            refreshCounties();
            for (let county of OregonCounties) {
                let el = document.createElement("option");
                el.textContent = county;
                el.value = county;
                Constants.countyDropdown.appendChild(el);
            }
        } else if (selectedState == "WA") {
            refreshCounties();
            for (let county of WashingtonCounties) {
                let el = document.createElement("option");
                el.textContent = county;
                el.value = county;
                Constants.countyDropdown.appendChild(el);
            }
        }
    };
    populateCounties();
}
function countySelectHandler(event: Event) {
    alert('selection changed');
    event.preventDefault();
    enteredLocation = `${Constants.countyDropdown.value} County, ${Constants.stateDropdown.value} trailheads`;
    Constants.placesList.innerHTML = "";
    axios.get<PlacesResponse>(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURI(enteredLocation)}&fields=formatted_address,geometry,name&key=${GOOGLE_API_KEY}`).then(response => {    
        if (response.data.status != 'OK') {
            throw new Error('Could not fetch location');
        }
        console.log(response)
        let results = response.data.results;
        let places = results.map(function(result) {
            return result.name;
        });
        console.log(places);
        for (let name of places) {
            let el = document.createElement("li");
            el.textContent = name;
            Constants.placesList.appendChild(el);
        }

    }).catch(error => {
        alert(error.message);
        console.log(error);
    });
}

Constants.stateDropdown.addEventListener('change', stateSelectHandler);
Constants.countyDropdown.addEventListener('change', countySelectHandler);