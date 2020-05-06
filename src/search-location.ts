import axios from 'axios';
// create this file and add your own unique API keys
import { GOOGLE_API_KEY, WEATHER_API_KEY } from './api-keys';
import { GoogleGeocodingResponse, OpenWeatherResponse } from './types';
import * as Constants from './constants';

let enteredLocation: string;
let coordinates: { lat: number; lng: number; };

export function searchLocationHandler(event: Event) {
    enteredLocation = Constants.locationInput.value;
    event.preventDefault();

    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredLocation)}&key=${GOOGLE_API_KEY}`).then(response => {
        if (response.data.status != 'OK') {
            throw new Error('Could not fetch location');
        }
        console.log(response)
        coordinates = response.data.results[0].geometry.location;
        const map = new google.maps.Map(Constants.mapElement, {
            center: coordinates,
            zoom: 8
        });
        new google.maps.Marker({position: coordinates, map: map});
        console.log(coordinates);

        const elevator = new google.maps.ElevationService;
        displayLocationElevation(coordinates, elevator);

        function displayLocationElevation(location: { lat: number; lng: number; }, elevator: any) {
            // Initiate the location request
            elevator.getElevationForLocations({
            'locations': [location]
            }, function(results: {elevation: number}[], _: any) {
                console.log(results);
                let elevationMeters = results[0].elevation;
                let elevationFeet = (elevationMeters * 3.281).toFixed(2);
                Constants.elevation.textContent = `Elevation at this point is ${elevationFeet} feet.`;
            });
        }
        axios.get<OpenWeatherResponse>(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&units=imperial&appid=${WEATHER_API_KEY}`).then(response => {
            console.log(response)
            Constants.weatherDescription.textContent = `Current weather condition: ${response.data.weather[0].description}.`;
            Constants.temperature.textContent = `Current temperature: ${response.data.main.temp.toString()} F.`;
        }).catch(error => {
            alert(error.message);
            console.log(error);
        });

        Constants.locationInformation.classList.remove("d-none");

    }).catch(error => {
        alert(error.message);
        console.log(error);
    });
};

Constants.form.addEventListener('submit', searchLocationHandler);