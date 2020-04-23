export type GoogleGeocodingResponse = {
    results: {geometry: {location: {lat: number, lng: number}}}[];
    status: 'OK' | 'ZERO_RESULTS';
}

export type OpenWeatherResponse = {
    weather: {description: string}[];
    main: {temp: number}
}