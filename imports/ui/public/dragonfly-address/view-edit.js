/**
 * Created by lucas on 2/4/17.
 */
import './view-edit.html';
import { showLoading } from '../../../api/utils/functions';
import Notification from '../../../api/utils/notification';
import { MapInstance } from '../../../api/utils/reactive-data';
import { DragonflyAddressModel, DAMApplyMasks, DAMGetFormOptions, DAMGetFilledFormValues } from '../../../api/api-dragonfly/model';
import { find } from '../utils/functions';
import {Session} from 'meteor/session';

const L = require('leaflet');

Session.set('map', false);

// load a tile layer
const BASE_LAYER = L.tileLayer(process.env.BASE_LAYER_URL, {
        attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
        maxZoom: 18
    });


Template.dragonfly_address_view_edit.onCreated(function () {

    showLoading(true);

    let params = {
        access_token: Session.get('bearer'),
        id: this.data.id
    };

    let template = Template.instance();

    template.address = new ReactiveVar(null);
    template.isEditing = new ReactiveVar(false);

    Meteor.call('dragonfly-find', params, (err, address) => {

        if(err) {

            Notification.danger(err.reason);

            showLoading(false);

            return;
        }

        template.address.set(address);

        let {latitude, longitude} = address;

        if(!(latitude && longitude)) {
            showLoading(false);
            return;
        }

        // renders map of if latitude and longitude are different of zero
        if(!(latitude == 0 || longitude == 0)) {

            setTimeout(() => {
                let map = MapInstance.get();

                // if map instantiate, remove it first
                if(map) {
                    map.remove();
                }

                map = L.map('mapid', {layers: [BASE_LAYER]}).setView([latitude, longitude], 13);

                L.marker([latitude, longitude]).addTo(map);

                MapInstance.set(map);
            }, 500);
        }

        showLoading(false);

    });
});

Template.dragonfly_address_view_edit.onRendered(() => {

    $('[data-toggle="tooltip"]').tooltip();
});

Template.dragonfly_address_view_edit.helpers({
    'hasLatLng': () => {

        if(!Template.instance().address.get()) {
            return false;
        }

        let {latitude, longitude} = Template.instance().address.get();

        return !!latitude && !!longitude;
    },
    'isTypeArray': (type) => {
        return type.toLowerCase() === 'array';
    },
    'getFieldsArrayIds': () => {
        return Template.instance().address.get().checklistItems.map(f => f.id);
    },
    'getFieldArrayIdValues': (id) => {

        return Template.instance().address.get().checklistItems.filter(f => f.id == id)[0];
    },
    'isEditing': () => {

        return Template.instance().isEditing.get();
    },
    /** @type boolean */
    'unblockEdit': (editPossible) => {
        return !(Template.instance().isEditing.get() && editPossible);
    },
    'formOptions':() => {

        let address = Template.instance().address;

        if(address.get()) {
            setTimeout(DAMApplyMasks, 200);
            return DAMGetFormOptions(address.get());
        }
        else {
            return [];
        }


    }
});

Template.dragonfly_address_view_edit.events({
    'click #editAddress': () => {
        Template.instance().isEditing.set(true);
    },
    'submit form': (event) => {

        event.preventDefault();

        showLoading(true);

        let formData = DAMGetFilledFormValues(Template.instance().address.get().id);

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