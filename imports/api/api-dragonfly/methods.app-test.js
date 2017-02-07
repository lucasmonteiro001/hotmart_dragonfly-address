/**
 * Created by lucas on 2/6/17.
 */
import {Meteor} from 'meteor/meteor';
import {assert} from 'meteor/practicalmeteor:chai';

if (Meteor.isAppTest && Meteor.isServer) {

    const test = function ({label, method, assertFunction, errorMsg}) {

        return (
            it(label, function () {

                return (new Promise(function (resolve, reject) {

                    Meteor.call(method, function (err, result) {

                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    });
                }))
                    .then(function (result) {
                        assertFunction(result);
                    })
                    .catch(function (err) {
                        assert.isNull(err, errorMsg + ' | ' + err.reason);
                    });
            })
        )
            ;
    };

    describe('Methods', function () {

        test({
            label: 'Testing authentication',
            method: 'dragonfly-login',
            assertFunction: function (res) {
                console.log('chamando assert')
                assert.isNotNull(res);
            },
            errorMsg: 'Deu erro'
        });

        /*it('Get authentication token to login', function () {

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

        });*/

    });
}

