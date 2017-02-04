/**
 * Created by lucas on 2/4/17.
 */
import './add.html';
import { HTTP } from 'meteor/http';
import Notification from '../../../api/common/notification';
import { showLoading } from '../../../api/common/functions';

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
    }
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
    'focusout #zipCode': () => {

        let cep = $('#zipCode').val();

        let url = 'https://viacep.com.br/ws/' + cep + '/json/';

        if(cep.length === 8) {

            HTTP.get(url, {}, (err, response) => {

                if(err) {
                    return;
                }

                if(!response.data.erro) {

                    let {data: {logradouro, bairro, localidade, uf, complemento}} = response;

                    $('#address').val(logradouro);
                    $('#complement').val(complemento);
                    $('#state').val(uf);
                    $('#neighborhood').val(bairro);
                    $('#city').val(localidade);
                    $('#country').val('Brasil');
                }
            });

            return false;
        }

    },
    'submit form': (event) => {
        event.preventDefault();

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

        showLoading(true);

        Meteor.call('dragonfly-insert', params, (err, res) => {

            $saveButton.button('reset');

            if(err) {

                Notification.danger(err.reason);

                showLoading(false);

                return;
            }

            Notification.success('Endereço salvo com sucesso!');

            showLoading(false);

            Modal.hide();

            setTimeout(() => {
                Notification.info('Para visualizar o novo endereço criado, clique em Obter endereços novamente!');
            }, 2000);
        });
    }
});
