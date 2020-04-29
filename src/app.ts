import { SearchLocation } from './search-location';
import * as Constants from './constants';

let searchLocation = new SearchLocation();

Constants.form.addEventListener('submit', searchLocation.searchLocationHandler);

