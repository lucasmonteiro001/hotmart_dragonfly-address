/**
 * Created by lucas on 2/6/17.
 */
/**
 * Created by lucas on 2/6/17.
 */
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { DragonflyAddressModel } from './model'

if(Meteor.isAppTest && Meteor.isServer) {


    describe('Dragonfly Address Model', function () {

        /**
         * Verify if the Model has the property in every field
         * @param property
         */
        const checkForProperty = (property) => {

            for(field of Object.keys(DragonflyAddressModel)) {

                for(field of Object.keys(DragonflyAddressModel)) {

                    assert.isNotNull(DragonflyAddressModel[field][property]);
                }
            }
        };

        it('Contains correct properties only', function (done) {

            let properties = ['label', 'zipCode', 'address', 'number', 'neighborhood', 'complement', 'city', 'state',
                'country', 'checkListItems'];

            for(field of Object.keys(DragonflyAddressModel)) {

                assert.isTrue(properties.indexOf(field) != -1);
            }

            done();
        });

        it('Every field has a label field', function (done) {

            checkForProperty('label');

            done();
        });

        it('Every field has a type field', function (done) {

            checkForProperty('type');

            done();
        });

        it('Every field has a id field', function (done) {

            checkForProperty('id');

            done();
        });

        it('Every field has a editPossible field', function (done) {

            checkForProperty('editPossible');

            done();
        });

    });
}


