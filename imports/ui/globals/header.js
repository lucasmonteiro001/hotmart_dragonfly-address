import { Template } from 'meteor/templating';
import '../public/dragonfly-address/add'
import './header.html';
import Notification from '../../api/common/notification';
import { Session } from 'meteor/session';
import { Addresses } from '../../api/common/reactive-data';

Template.header.onRendered(() => {
    Session.set('bearer', false);
    Session.set('dragonfly-size', 0);
    Session.set('dragonfly-page', 0);

    // TODO REMOVER
    Session.set('bearer', '00984c7a-4883-4d51-a103-bbf9bc9861a2');
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
    'click #listAddress': () => {

        Meteor.call('dragonfly-find', {access_token: Session.get('bearer')}, (err, {page, size, addresses}) => {

            if(err) {
                Notification.danger(err.reason);

                // set addresses found to empty array
                Addresses.set([]);
                return;
            }

            Addresses.set(addresses);

            Session.set('dragonfly-size', size);

            Session.set('dragonfly-page', page);

        });

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