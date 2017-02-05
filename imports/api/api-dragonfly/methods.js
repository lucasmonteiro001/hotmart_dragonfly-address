/**
 * Created by lucas on 2/3/17.
 */
import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';
import API from '../utils/api-url';
import Status from '../utils/status-code';

import {getLatLng} from '../utils/location';

Meteor.methods({

    /**
     * Get a new authentication token to perform actions in the system
     * @returns {*}
     */
    'dragonfly-login'() {

        try {
            let {data: {access_token}} = HTTP.call('POST', process.env.API_LOGIN, {headers: {Authorization: process.env.HEADER_AUTHORIZATION}});

            return access_token;

        } catch ( error ) {

            console.log(error);

            let {response: {statusCode}} = error;

            throw new Meteor.Error(statusCode, Status.get(statusCode).reason, Status.get(statusCode).details);
        }

    },
    /**
     * Inserts a new data in the database
     * @param access_token
     * @param data
     */
    'dragonfly-insert'({access_token, data}) {

        return getLatLng(data.zipCode)
                .then( ({latitude, longitude}) => {

                    let formData = {...data};

                    formData.latitude = latitude;
                    formData.longitude = longitude;

                    try {
                        let address = HTTP.call('POST', API.insert(), {data: formData, headers: {Authorization: `Bearer ${access_token}`}})

                        return address;

                    } catch (error) {

                        console.log(error);

                        let {response: {statusCode}} = error;

                        throw new Meteor.Error(statusCode, Status.get(statusCode).reason, Status.get(statusCode).details);
                    }
                })
                .catch(({ error, reason, details }) =>  {
                    throw new Meteor.Error(error, reason, details);
                });


    },
    /**
     * Find one address (if param.id is passed) or brings all data from the system (given the page and rows parameters)
     * @param access_token
     * @param id
     * @param page
     * @param rows
     * @returns {*}
     */
    'dragonfly-find'({access_token, id = null, page = 1, rows = 20}) {

        let httpAddress =  "";

        if(id) {
            httpAddress = API.findOne(id);
        }
        else {
            httpAddress = API.findAll(page, rows)
        }

        try {
            let response = HTTP.call('get', httpAddress, {headers: {Authorization: `Bearer ${access_token}`}});

            // if id, object data is the return
            if(id) {
                return response.data;
            }
            else {

                let {page, size, data} = response.data;

                return {page, size, addresses: data};
            }


        } catch ( error ) {

            console.log(error);

            let {response: {statusCode}} = error;

            throw new Meteor.Error(statusCode, Status.get(statusCode).reason, Status.get(statusCode).details);
        }
    },
    /**
     * Remove an address given its id
     * @param access_token
     * @param id
     * @returns {*}
     */
    'dragonfly-remove'({access_token, id}) {

        let formData = { id };

        try {
            let response = HTTP.call('DELETE', API.delete(id), {data: formData, headers: {Authorization: `Bearer ${access_token}`}})

            return response;

        } catch ( {response: {statusCode, content}} ) {

            console.log(error);

            let {response: {statusCode}} = error;

            throw new Meteor.Error(statusCode, Status.get(statusCode).reason, Status.get(statusCode).details);
        }
    },
    /**
     * Update and address with data passed as a parameter
     * @param access_token
     * @param data
     * @returns {*}
     */
    'dragonfly-update'({access_token, data}) {


        try {
            let address = HTTP.call('PUT', API.update(data.id), {data, headers: {Authorization: `Bearer ${access_token}`}})

            return address;

        } catch (error) {

            console.log(error);

            let {response: {statusCode, content}} = error;

            throw new Meteor.Error(statusCode, Status.get(statusCode).reason, Status.get(statusCode).details);
        }
    }

});