/**
 * Created by lucas on 2/4/17.
 */
import './view-edit.html';
import { showLoading } from '../../../api/common/functions';
import Notification from '../../../api/common/notification';
import { MapInstance } from '../../../api/common/reactive-data';
import { DragonflyAddressModel } from '../../../api/api-dragonfly/model';
import { find } from '../utils/functions';
import {Session} from 'meteor/session';

const L = require('leaflet');

Session.set('map', false);

// load a tile layer
const BASE_LAYER = L.tileLayer('https://api.mapbox.com/styles/v1/lucasmonteiro001/ciylfwkph00332rqqmdd3bsdj/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHVjYXNtb250ZWlybzAwMSIsImEiOiJjaXlsZTl0cGcwMDBrMzNwZm9qcnIxYjd6In0.V3qGeRTZbZW97ywL2Ue09Q',
    {
        attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
        maxZoom: 18
    });


Template.dragonfly_address_view_edit.onCreated(function () {

    let { data } = this;

    Template.instance().address = data;

    Template.instance().isEditing = new ReactiveVar(false);
});

Template.dragonfly_address_view_edit.onRendered(() => {

    let {latitude, longitude} = Template.instance().address;

    if(!(latitude && longitude)) {
        return;
    }

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

});

Template.dragonfly_address_view_edit.helpers({
    'hasLatLng': () => {

        let {latitude, longitude} = Template.instance().address;

        return !!latitude && !!longitude;
    },
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