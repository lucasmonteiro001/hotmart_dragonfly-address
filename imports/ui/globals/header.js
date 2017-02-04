import { Template } from 'meteor/templating';
import {st_login, st_login_values} from '../../api/common/reactive_data';
import './header.html';

Template.header.onCreated(() => {

});

Template.header.helpers({
    'loginDefault': () => {
        return st_login_values.default;
    },
    'loginOnChange': () => {
        return st_login_values.onChange;
    }
});

Template.header.onRendered(() => {

    console.log(TAPi18n.__('title'))
});

Template.header.events({
    'click #login': () => {

        let $button = $('#login');

        $button.button('loading');

        setTimeout(() => {

            $button.button('reset');

        }, 5000)
    }
});