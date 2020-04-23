import { SearchAddress } from './search-address';
import * as Constants from './constants';

let searchAddress = new SearchAddress();

Constants.form.addEventListener('submit', searchAddress.searchAddressHandler);

