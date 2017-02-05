/**
 * Created by lucas on 2/4/17.
 */
import './add.html';
import { HTTP } from 'meteor/http';
import Notification from '../../../api/utils/notification';
import { showLoading } from '../../../api/utils/functions';
import { find } from '../utils/functions';
import { DragonflyAddressModel, DAMApplyMasks, DAMGetFormOptions } from '../../../api/api-dragonfly/model';

Template.dragonfly_address_add.helpers({
    'formOptions':() => {

        setTimeout(DAMApplyMasks, 200);

        // do not return objects where type=ARRAY
        return DAMGetFormOptions().filter(element => element.type.toLowerCase() != 'array');
    }
});

Template.dragonfly_address_add.events({
    'focusout #zipCode': () => {

        let cep = $('#zipCode').val();

        let url = 'https://viacep.com.br/ws/' + cep + '/json/';

        if(cep.length === 9) {

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

        for(prop in DragonflyAddressModel) {
            formData[prop] = $('#' + DragonflyAddressModel[prop].id).val();
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

            showLoading(false);

            find('Endereço salvo com sucesso!');

            Modal.hide();

        });
    }
});
