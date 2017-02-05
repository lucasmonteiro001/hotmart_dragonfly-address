/**
 * Created by lucas on 2/4/17.
 */
import Status from './status-code';

const ZIPCODE_STATUS_CODE = 1000;

const zipCodeError = Status.get(ZIPCODE_STATUS_CODE);

const zipCodeErrorObject = {
        error: ZIPCODE_STATUS_CODE,
        reason: zipCodeError.reason,
        detail: zipCodeError.details
    };

const NodeGeocoder = require('node-geocoder');

// Options for geocode
const options = {
    provider: 'google',
    apiKey: process.env.GOOGLE_GEOCODE_KEY
};

const geocoder = NodeGeocoder(options);

/**
 * Find latitude and longitude based on the $data passed as a parameter
 * @param data (should be a zipCode, e.g 32115-190)
 * @return Promise. If resolve, return {latitude, longitude}, else throw error
 */
export function getLatLng(data) {

    return new Promise((resolve, reject) => {

        // if data is empty, return lat:0, lng:0
        if(!data || data.length === 0) {
            resolve({latitude: 0, longitude:0});
            return;
        }

        // make request
        geocoder.geocode(data, function(err, res) {

            if(err) {
                reject(zipCodeErrorObject);
                return;
            }
            else if(res.length === 0) {
                reject(zipCodeErrorObject);
                return;
            }

            let {latitude, longitude} = res[0];

            resolve({latitude, longitude});
        })
    });
}
