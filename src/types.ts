export type GoogleGeocodingResponse = {
    results: {geometry: {location: {lat: number, lng: number}}}[];
    status: 'OK' | 'ZERO_RESULTS';
}

export type PlacesResponse = {
    results: {geometry: {location: {lat: number, lng: number}}, name: string}[];
    status: 'OK' | 'ZERO_RESULTS';
}

export type OpenWeatherResponse = {
    weather: {description: string}[];
    main: {temp: number}
}