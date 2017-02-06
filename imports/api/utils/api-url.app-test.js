/**
 * Created by lucas on 2/6/17.
 */
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { findAll, findOne, update, insert} from './api-url';
import U from './api-url';

if(Meteor.isAppTest && Meteor.isServer) {

    const apiAddress = process.env.API_ADDRESS;

    describe('API endpoints', function () {

        it('Returns correct (find endpoint)', function (done) {

            assert.equal(`${apiAddress}?rows=20&page=1`, findAll());

            done();
        });

        it('Returns correct (findOne endpoint)', function (done) {

            const id = 212;

            assert.equal(`${apiAddress}/${id}`, findOne(id));

            done();
        });

        it('Returns correct (update endpoint)', function (done) {

            const id = 212;

            assert.equal(`${apiAddress}/${id}`, update(id));

            done();
        });

        it('Returns correct (insert endpoint)', function (done) {

            assert.equal(`${apiAddress}`, insert());

            done();
        });

        it('Returns correct (delete endpoint)', function (done) {

            const id = 212;

            assert.equal(`${apiAddress}/${id}`, U.delete(id));

            done();
        });

    });
}

