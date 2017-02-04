import { Template } from 'meteor/templating';
import '../public/dragonfly-address/add'
import './header.html';
import Notification from '../../api/common/notification';
import { Session } from 'meteor/session';

Template.header.onRendered(() => {
    Session.set('bearer', false);
});

Template.header.helpers({
    isLoggedIn: () => {

        let isLoggedIn = false;

        try {
            isLoggedIn = Session.get('bearer');
        } catch (e) {

        }

        return isLoggedIn;
    }
});

Template.header.onRendered(() => {

    console.log(TAPi18n.__('title'))
});

Template.header.events({
    'click #addAddress': () => {
        Modal.show('dragonfly_address_add');
    },
    'click #login': () => {

        let $button = $('#login');

        $button.button('loading');

        Meteor.call('dragonfly-login', (err, access_token) => {

            if(err) {
                Notification.danger(err.reason);
                Session.set('bearer', false);
                return;
            }

            Notification.success('Autenticado com sucesso!');
            Session.set('bearer', access_token);

        });

        setTimeout(() => {

            $button.button('reset');

        }, 2000)
    }
});