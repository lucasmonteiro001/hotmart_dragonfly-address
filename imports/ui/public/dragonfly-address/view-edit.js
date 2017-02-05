/**
 * Created by lucas on 2/4/17.
 */
import './view-edit.html';
import { showLoading } from '../../../api/common/functions';
import Notification from '../../../api/common/notification';
import { DragonflyAddressModel } from '../../../api/api-dragonfly/model';
import { find } from '../utils/functions';

Template.dragonfly_address_view_edit.onCreated(function () {

    let { data } = this;

    Template.instance().address = data;

    Template.instance().isEditing = new ReactiveVar(false);
});

Template.dragonfly_address_view_edit.helpers({
    'isEditing': () => {
        return Template.instance().isEditing.get();
    },
    /** @type boolean */
    'unblockEdit': (editPossible) => {
        return !(Template.instance().isEditing.get() && editPossible);
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
    },
    'submit form': (event) => {

        event.preventDefault();

        showLoading(true);

        // get all form data
        let formData = {};

        for(prop in DragonflyAddressModel) {
            formData[prop] = $('#' + DragonflyAddressModel[prop].id).val();
        }

        // add id to the form regarding the address beign edited
        formData.id = Template.instance().address.id;

        // TODO buscar dados automaticamente
        formData.availableItems = [];

        let params = {
            access_token: Session.get('bearer'),
            data: formData
        };

        Meteor.call('dragonfly-update', params, (err, res) => {

            if(err) {

                Notification.danger(err.reason);

                showLoading(false);

                return;
            }

            Notification.success('Endereço atualizado com sucesso!');

            showLoading(false);

            Modal.hide();

            find();
        });
    }
});