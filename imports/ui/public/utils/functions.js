/**
 * Created by lucas on 2/4/17.
 */
import {Addresses, Size, Page, Rows} from '../../../api/utils/reactive-data';
import Notification from '../../../api/utils/notification';
import { showLoading } from '../../../api/utils/functions';

export const find = (successMsg = "Endereços obtidos com sucesso!") => {

    showLoading(true);

    // reload data
    Meteor.call('dragonfly-find', {access_token: Session.get('bearer'), page: Page.get(), rows: Rows.get()}, (err, {page, size, addresses}) => {

        if(err) {
            Notification.danger(err.reason);

            // set addresses found to empty array
            Addresses.set([]);
            Page.set(1);
            Size.set(0);

            showLoading(false);

            return;
        }

        Addresses.set(addresses);
        Page.set(page);
        Size.set(size);

        showLoading(false);

        Notification.success(successMsg);
    });
};