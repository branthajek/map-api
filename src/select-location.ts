
import * as Constants from './constants';

Constants.countyDropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose County';

Constants.stateDropdown.add(defaultOption);
Constants.stateDropdown.selectedIndex = 0;

// from here I need to get an API for states to fill in the state drop down, or do it manually
// Then I need to pull in the value of whatever state was selected into a var
// Then I need to inject that value into the geocoding API and filter the list of counties from the returned JSON
// Then I need to return any location that is a trailhead
// Offer optional filtering?

// const url = '`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredLocation)}&key=${GOOGLE_API_KEY}`';

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