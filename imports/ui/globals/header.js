import { Template } from 'meteor/templating';
import '../public/dragonfly-address/add'
import '../public/dragonfly-address/settings'
import './header.html';
import Notification from '../utils/notification';
import { Session } from 'meteor/session';
import { Addresses, Page, Size, Rows } from '../utils/reactive-data';
import { showLoading } from '../utils/functions';

Template.header.onRendered(() => {
    Session.set('bearer', false);

    // TODO REMOVER
    Session.set('bearer', '3b0572c3-934b-4fe4-abe0-ad67c7d7693f');

    $('[data-toggle="tooltip"]').tooltip();
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

Template.header.events({
    'click #addAddress': () => {
        Modal.show('dragonfly_address_add');
    },
    'click #settings': () => {
        Modal.show('dragonfly_settings');
    },
    'click #listAddress': () => {

        $button = $('#listAddress');

        $button.button('loading');

        let rows = Rows.get() || 1,
            page = Page.get() || 10;

        showLoading(true);

        Meteor.call('dragonfly-find', {access_token: Session.get('bearer'), page, rows}, (err, {page, size, addresses}) => {

            if(err) {
                Notification.danger(err.reason);

                // set addresses found to empty array
                Addresses.set([]);
                Page.set(1);
                Size.set(0);

                $button.button('reset');

                showLoading(false);

                return;
            }

            Addresses.set(addresses);
            Page.set(page);
            Size.set(size);

            $button.button('reset');

            Notification.success('Endereços obtidos com sucesso!');

            showLoading(false);

        });

    },
    'click #login': () => {

        let $button = $('#login');

        $button.button('loading');

        showLoading(true);

        Meteor.call('dragonfly-login', (err, access_token) => {

            if(err) {
                Notification.danger(err.reason);

                Session.set('bearer', false);

                showLoading(false);

                $button.button('reset');

                return;
            }

            Notification.success('Autenticado com sucesso!');

            showLoading(false);

            $button.button('reset');

            Session.set('bearer', access_token);

        });

    }
});