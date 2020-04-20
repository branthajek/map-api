import axios from 'axios';
// create this file and add your own unique API key
import { GOOGLE_API_KEY } from './google-api-key';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

type GoogleGeocodingResponse = {
    results: {geometry: {location: {lat: number, lng: number}}}[];
    status: 'OK' | 'ZERO_RESULTS';
}

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    const mapElement = document.getElementById('map')! as HTMLDivElement;

    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`).then(response => {
        if (response.data.status != 'OK') {
            throw new Error('Could not fetch location');
        }
        console.log(response)
        const coordinates = response.data.results[0].geometry.location;
        const map = new google.maps.Map(mapElement, {
            center: coordinates,
            zoom: 8
        });
        new google.maps.Marker({position: coordinates, map: map});
        console.log(coordinates);
    }).catch(error => {
        alert(error.message);
        console.log(error);
    });
};

form.addEventListener('submit', searchAddressHandler);