/**
 * Created by lucas on 2/3/17.
 */
import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';
import API from '../common/api-url';
import Status from '../common/status-code';

import {getLatLng} from '../common/location';

Meteor.methods({

    'dragonfly-login'() {

        try {
            let {data: {access_token}} = HTTP.call('POST', process.env.API_LOGIN, {headers: {Authorization: process.env.HEADER_AUTHORIZATION}});

            console.info('access_token', access_token);

            return access_token;

        } catch ( error ) {

            console.log(error);

            let {response: {statusCode}} = error;

            throw new Meteor.Error(statusCode, Status.get(statusCode).reason, Status.get(statusCode).details);
        }

    },
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
    'dragonfly-find'({access_token, id = null, page = 1, rows = 20}) {

        let httpAddress =  API.findAll(page, rows);

        try {
            let response = HTTP.call('get', httpAddress, {headers: {Authorization: `Bearer ${access_token}`}})

            let {page, size, data} = response.data;

            return {page, size, addresses: data};

        } catch ( error ) {

            console.log(error);

            let {response: {statusCode}} = error;

            throw new Meteor.Error(statusCode, Status.get(statusCode).reason, Status.get(statusCode).details);
        }
    },
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