/**
 * Created by lucas on 2/6/17.
 */
import {Meteor} from 'meteor/meteor';
import {assert} from 'meteor/practicalmeteor:chai';

if (Meteor.isAppTest && Meteor.isServer) {

    describe('Methods', function () {

      it('Get authentication token to login', function () {

            return (new Promise(function (resolve, reject) {


                Meteor.call('dragonfly-login', (err, access_token) => {

                    if (err) {
                        reject(err);
                    }

                    resolve(access_token);
                });

            }))
                .then(function (access_token) {
                    assert.isNotNull(access_token);
                })
                .catch(function (err) {
                    assert.isNull(err);
                });

        });

    });
}

