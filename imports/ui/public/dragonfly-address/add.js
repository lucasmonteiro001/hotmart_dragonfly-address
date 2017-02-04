/**
 * Created by lucas on 2/4/17.
 */
import './add.html';
import Notification from '../../../api/common/notification';

const formOptions = {
    "label": {
        label: 'Nome',
        type: 'text',
        id: 'label',
        required: true
    },
    "zipCode": {
        label: 'CEP',
        type: 'text',
        id: 'zipCode'
    },
    "address": {
        label: 'Endereço',
        type: 'text',
        id: 'address'
    },
    "number": {
        label: 'Número',
        type: 'text',
        id: 'number'
    },
    "neighborhood": {
        label: 'Bairro',
        type: 'text',
        id: 'neighborhood'
    },
    "complement":{
        label: 'Complemento',
        type: 'text',
        id: 'complement'
    },
    "city": {
        label: 'Cidade',
        type: 'text',
        id: 'city'
    },
    "state": {
        label: 'Estado',
        type: 'text',
        id: 'state'
    },
    "country": {
        label: 'País',
        type: 'text',
        id: 'country',
        required: true
    },
    "latitude": {
        label: 'Latitude',
        type: 'number',
        id: 'latitude',
        required: true
    },
    "longitude": {
        label: 'Longitude',
        type: 'number',
        id: 'longitude',
        required: true
    },
};

Template.dragonfly_address_add.helpers({
    'formOptions':() => {

        let options = [];

        for(prop in formOptions) {

            options.push(formOptions[prop]);
        }

        return options;
    }
});

Template.dragonfly_address_add.events({
    'submit form': (event) => {
        event.preventDefault();

        alert('OBTER LATITUDE E LONGITUDE AUTOMATICAMENTE')


        let $saveButton = $('#adicionarEndereco');

        $saveButton.button('loading');

        // get all form data
        let formData = {};

        for(prop in formOptions) {
            formData[prop] = $('#' + formOptions[prop].id).val();
        }

        let params = {
            access_token: Session.get('bearer'),
            data: formData
        };

        Meteor.call('dragonfly-insert', params, (err, res) => {

            $saveButton.button('reset');

            if(err) {
                Notification.danger(err.reason);
                return;
            }

            Notification.success('Endereço salvo com sucesso!');
            Modal.hide();
        });
    }
});
