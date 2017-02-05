/**
 * Created by lucas on 2/4/17.
 */
import './view-edit.html';
import { DragonflyAddressModel } from '../../../api/api-dragonfly/model';

Template.dragonfly_address_view_edit.onCreated(function () {

    let { data } = this;

    Template.instance().address = data;

    Template.instance().isEditing = new ReactiveVar(false);
});

Template.dragonfly_address_view_edit.helpers({
    'isNotEditing': () => {
        return !Template.instance().isEditing.get();
    },
    'formOptions':() => {

        let options = [];

        for(prop in DragonflyAddressModel) {

            let opt = {...DragonflyAddressModel[prop]};

            // get the property current value
            opt.val = Template.instance().address[prop];

            options.push(opt);
        }

        console.log(options)

        return options;
    }
});

Template.dragonfly_address_view_edit.events({
    'click #editAddress': () => {
        Template.instance().isEditing.set(true);
    }
});