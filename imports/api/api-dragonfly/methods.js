/**
 * Created by lucas on 2/3/17.
 */
import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';
import API from '../common/api-url';
import Status from '../common/status-code';

Meteor.methods({

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
    'dragonfly-insert'({access_token, data}) {

        try {
            let address = HTTP.call('POST', API.insert(), {data, headers: {Authorization: `Bearer ${access_token}`}})

            return address;

        } catch (error) {

            console.log(error);

            let {response: {statusCode}} = error;

            throw new Meteor.Error(statusCode, Status.get(statusCode).reason, Status.get(statusCode).details);
        }
    },

});