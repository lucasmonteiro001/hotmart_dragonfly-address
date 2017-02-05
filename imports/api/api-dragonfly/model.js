/**
 * Created by lucas on 2/4/17.
 */

export const DragonflyAddressModel = {
    "label": {
        label: 'Nome',
        type: 'text',
        id: 'label',
        required: true,
        col: 'col-xs-12',
        editPossible: true
    },
    "zipCode": {
        label: 'CEP',
        type: 'text',
        id: 'zipCode',
        pattern: '[0-9]{8}',
        title: 'CEP só pode conter números',
        col: 'col-xs-5',
        editPossible: false
    },
    "address": {
        label: 'Endereço',
        type: 'text',
        id: 'address',
        col: 'col-xs-8',
        editPossible: false
    },
    "number": {
        label: 'Número',
        type: 'text',
        id: 'number',
        col: 'col-xs-4',
        editPossible: false
    },
    "neighborhood": {
        label: 'Bairro',
        type: 'text',
        id: 'neighborhood',
        col: 'col-xs-8',
        editPossible: false
    },
    "complement":{
        label: 'Complemento',
        type: 'text',
        id: 'complement',
        col: 'col-xs-4',
        editPossible: false
    },
    "city": {
        label: 'Cidade',
        type: 'text',
        id: 'city',
        col: 'col-xs-5',
        editPossible: false
    },
    "state": {
        label: 'Estado',
        type: 'text',
        id: 'state',
        col: 'col-xs-3',
        editPossible: false
    },
    "country": {
        label: 'País',
        type: 'text',
        id: 'country',
        col: 'col-xs-4',
        required: true,
        editPossible: false
    }
};

Object.freeze(DragonflyAddressModel);