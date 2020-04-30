import { SearchLocation } from './search-location';
import * as Constants from './constants';
import './select-location';

let searchLocation = new SearchLocation();

Constants.form.addEventListener('submit', searchLocation.searchLocationHandler);

