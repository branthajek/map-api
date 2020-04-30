
import axios from 'axios';
import * as Constants from './constants';
import { States } from './us-states-list';
import { GoogleGeocodingResponse } from './types';
import { GOOGLE_API_KEY } from './api-keys';

const defaultStateOption = document.createElement('option');
const defaultCountyOption = document.createElement('option');
defaultStateOption.text = '';
Constants.stateDropdown.length = 0;
Constants.stateDropdown.add(defaultStateOption);
defaultCountyOption.text = '';
Constants.countyDropdown.length = 0;
Constants.countyDropdown.add(defaultCountyOption);

function populateStates() {
    for (let state of States) {
        let el = document.createElement("option");
        el.textContent = state;
        el.value = state;
        Constants.stateDropdown.appendChild(el);
    }
};
populateStates();

function stateSelectHandler() {
    alert('selection changed');
    let selectedState = Constants.stateDropdown.value;

    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(selectedState)}&key=${GOOGLE_API_KEY}`).then(response => {
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

// from here I need to get an API for states to fill in the state drop down, or do it manually
// Then I need to pull in the value of whatever state was selected into a var
// Then I need to inject that value into the geocoding API and filter the list of counties from the returned JSON
// Then I need to return any location that is a trailhead
// Offer optional filtering?

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