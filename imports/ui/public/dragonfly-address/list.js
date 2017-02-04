/**
 * Created by lucas on 2/4/17.
 */
import './list.html';
import {Addresses} from '../../../api/common/reactive-data';

Template.dragonfly_address_list.helpers({
    'isEmpty': () => {
        return Addresses.get().length === 0;
    },
    'addresses': () => {
        return Addresses.get();
}
});
