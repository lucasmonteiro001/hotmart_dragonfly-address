/**
 * Created by lucas on 2/6/17.
 */
/**
 * Created by lucas on 2/6/17.
 */
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { DragonflyAddressModel, DAMGetFormOptions } from './model'

if(Meteor.isAppTest && Meteor.isServer) {

    const properties = ['label', 'zipCode', 'address', 'number', 'neighborhood', 'complement', 'city', 'state',
        'country', 'checkListItems'];


    describe('Dragonfly Address Model', function () {

        /**
         * Verify if the Model has the property in every field
         * @param property
         */
        const checkForProperty = (property) => {

            for(field of Object.keys(DragonflyAddressModel)) {

                let result = DragonflyAddressModel[field][property];

                assert.isTrue(result != undefined && result != null, 'property: ' + property + ' - field: ' + field);
            }
        };

        it('Contains correct properties only', function (done) {

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

        describe('Get form options', function () {

            const checkFieldExists = (field) => {

                if(!field) {
                    return false;
                }

                let formOptions = DAMGetFormOptions();

                for(prop of formOptions) {
                    console.log(field, prop.id);
                    if(field == prop.id) {
                        return true;
                    }
                }

                return false
            };

            it('Get options for adding new address', function (done) {


                done()
                let formOptions = DAMGetFormOptions(),
                    formOptionsKeys = Object.keys(formOptions[0]);

                // console.log(formOptions)
                // console.log(formOptionsKeys)

                // checks if methods returns all properties
                for(prop of properties) {

                    // make sure that all properties are returned from the method
                    assert.isTrue(checkFieldExists(prop));
                }

                done();
            })
        });

    });
}


