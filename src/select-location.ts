
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
        if (selectedState == "Oregon") {
            refreshCounties();
            for (let county of OregonCounties) {
                let el = document.createElement("option");
                el.textContent = county;
                el.value = county;
                Constants.countyDropdown.appendChild(el);
            }
        } else if (selectedState == "Washington") {
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
function countySelectHandler() {
    alert('selection changed');
    enteredLocation = `Trailhead ${Constants.countyDropdown.value} county ${Constants.stateDropdown.value} state`;

    axios.get<PlacesResponse>(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURI(enteredLocation)}&fields=formatted_address,geometry,name&key=${GOOGLE_API_KEY}`).then(response => {    
        if (response.data.status != 'OK') {
            throw new Error('Could not fetch location');
        }
        console.log(response)
        // coordinates = response.data.results[0].geometry.location;
        // const map = new google.maps.Map(Constants.mapElement, {
        //     center: coordinates,
        //     zoom: 8
        // });
        // new google.maps.Marker({position: coordinates, map: map});
        // console.log(coordinates);

        // const elevator = new google.maps.ElevationService;
        // displayLocationElevation(coordinates, elevator);

        // function displayLocationElevation(location: { lat: number; lng: number; }, elevator: any) {
        //     // Initiate the location request
        //     elevator.getElevationForLocations({
        //     'locations': [location]
        //     }, function(results: {elevation: number}[], _: any) {
        //         console.log(results);
        //         let elevationMeters = results[0].elevation;
        //         let elevationFeet = (elevationMeters * 3.281).toFixed(2);
        //         Constants.elevation.textContent = `Elevation at this point is ${elevationFeet} feet.`;
        //     });
        // }
    }).catch(error => {
        alert(error.message);
        console.log(error);
    });
}

Constants.stateDropdown.addEventListener('change', stateSelectHandler);
Constants.countyDropdown.addEventListener('change', countySelectHandler);

// const url = ``;

// const request = new XMLHttpRequest();
// request.open('GET', url, true);

// request.onload = function() {
//   if (request.status === 200) {
//     const data = JSON.parse(request.responseText);
//     let option;
//     for (let i = 0; i < data.length; i++) {
//       option = document.createElement('option');
//       option.text = data[i].name;
//       option.value = data[i].abbreviation;
//       Constants.stateDropdown.add(option);
//     }
//    } else {
//     // Reached the server, but it returned an error
//   }   
// }

// request.onerror = function() {
//   console.error('An error occurred fetching the JSON from ' + url);
// };

// request.send();