/**
 * Created by lucas on 2/4/17.
 */
import './list.html';
import {Addresses, Size, Page, Rows} from '../../../api/common/reactive-data';
import Notification from '../../../api/common/notification';

Template.dragonfly_address_list.helpers({
    'isEmpty': () => {
        return Addresses.get().length === 0;
    },
    'addresses': () => {
        return Addresses.get();
    },
    'size': () => {
        return Size.get();
    },
    'page': () => {
        return Page.get();
    },
    'rows': () => {
        return Rows.get();
    },
    // return how many pages are shown from the api
    'footerText': () => {
        let size = Size.get(),
            page = Page.get(),
            rows = Rows.get();

        let totalNumberPages = Math.ceil(size / rows);

        return `${page} de ${totalNumberPages}`;
    }
});

Template.dragonfly_address_list.events({
    'click #nextRow': () => {

        let size = Size.get(),
            page = Page.get(),
            rows = Rows.get();

        let totalNumberPages = Math.ceil(size / rows);

        if(page < totalNumberPages) {

            // increase to go to next page
            page += 1;

            Meteor.call('dragonfly-find', {access_token: Session.get('bearer'), page, rows}, (err, {page, size, addresses}) => {

                if(err) {
                    Notification.danger(err.reason);

                    // set addresses found to empty array
                    Addresses.set([]);
                    Page.set(1);
                    Size.set(0);

                    return;
                }

                Addresses.set(addresses);
                Page.set(page);
                Size.set(size);

            });
        }
        else {
            Notification.warning('Não há próxima página!');
        }

    },
    'click #prevRow': () => {

        let page = Page.get(),
            rows = Rows.get();

        if(page === 1) {
            Notification.warning('Não há página anterior!');
        }
        else if (page > 1) {

            // decrease go to the previous page
            page -= 1;

            Meteor.call('dragonfly-find', {access_token: Session.get('bearer'), page, rows}, (err, {page, size, addresses}) => {

                if(err) {
                    Notification.danger(err.reason);

                    // set addresses found to empty array
                    Addresses.set([]);
                    Page.set(1);
                    Size.set(0);

                    return;
                }

                Addresses.set(addresses);
                Page.set(page);
                Size.set(size);

            });
        }
    }
});
