/**
 * Created by lucas on 2/6/17.
 */
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { getLatLng } from './location';

if(Meteor.isAppTest && Meteor.isServer) {

    const data = {
        zipCode: '32115-190',
        lat: -19.8930573,
        lng: -44.0258416
    }

    describe('Location helper', function () {

        it('Get correct latitude and longitude', function () {

            return getLatLng(data.zipCode)
                .then( function ({latitude, longitude}) {

                    assert.equal(data.lat, latitude);

                    assert.equal(data.lng , longitude);

                })
                .catch( function (error) {

                    assert.isUndefined(error, 'CEP inválido');

                });

        });

    });
}


