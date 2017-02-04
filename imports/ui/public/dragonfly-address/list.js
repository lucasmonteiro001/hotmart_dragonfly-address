/**
 * Created by lucas on 2/4/17.
 */
import './list.html';
import {Addresses, Size, Page, Rows} from '../../../api/common/reactive-data';

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

        console.info('footer');
        console.log(size, page, rows)

        let totalNumberPages = Math.ceil(size / rows);

        return `${page} de ${totalNumberPages}`;
    }
});
