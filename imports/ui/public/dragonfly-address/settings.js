/**
 * Created by lucas on 2/4/17.
 */
import './settings.html';
import { Rows, Page, Addresses, Size } from '../../../api/utils/reactive-data';
import { showLoading } from '../../../ui/public/utils/functions';

Template.dragonfly_settings.events({
    'submit form': (event) => {
        event.preventDefault();

        showLoading(true);

        $button = $('#updateNumberOfRowsPerPage');

        $button.button('loading');

        // update rows value to the new value entered by the user
        Rows.set(Number($('#numberOfRowsPerPage').val()));

        // reset page to 1
        Page.set(1);

        // reloads the table
        Meteor.call('dragonfly-find', {access_token: Session.get('bearer'), page: Page.get(), rows: Rows.get()}, (err, {page, size, addresses}) => {

            if(err) {
                Notification.danger(err.reason);

                // set addresses found to empty array
                Addresses.set([]);
                Page.set(1);
                Size.set(0);

                $button.button('reset');

                showLoading(false);

                Modal.hide();

                return;
            }

            Addresses.set(addresses);
            Page.set(page);
            Size.set(size);

            $button.button('reset');

            showLoading(false);

            Modal.hide();

        });
    }
});

Template.dragonfly_settings.helpers({
    'rows': () => {
        return Rows.get();
    }
});
