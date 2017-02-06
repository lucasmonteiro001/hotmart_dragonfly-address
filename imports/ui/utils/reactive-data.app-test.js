/**
 * Created by lucas on 2/6/17.
 */
/**
 * Created by lucas on 2/6/17.
 */
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Page, Rows, Addresses, Size } from './reactive-data';

describe('Reactive Data', function () {

    it('Check Page default', function (done) {
        // Set Loading to true
        assert.equal(1, Page.get(), 'Default page value should be 1');

        done();
    });

    it('Check Rows default', function (done) {
        // Set Loading to true
        assert.equal(10, Rows.get(), 'Default rows value should be 10');

        done();
    });

    it('Check Size default', function (done) {
        // Set Loading to true
        assert.equal(0, Size.get(), 'Default rows value should be 0');

        done();
    });

    it('Check displayed Address default', function (done) {
        // Set Loading to true
        assert.equal(0, Addresses.get().length, 'Addresses should be initialized empty');

        done();
    });
});
