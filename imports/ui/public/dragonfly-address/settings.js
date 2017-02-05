/**
 * Created by lucas on 2/4/17.
 */
import './settings.html';
import { Rows, Page, Addresses, Size } from '../../../api/utils/reactive-data';
import { showLoading } from '../../../ui/public/utils/functions';
import { find } from '../utils/functions';

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
        find();

        Modal.hide();
    }
});

Template.dragonfly_settings.helpers({
    'rows': () => {
        return Rows.get();
    }
});
