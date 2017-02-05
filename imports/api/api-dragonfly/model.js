/**
 * Created by lucas on 2/4/17.
 */

/** Model definition of all fields of a Dragonfly Address Model
 * @type {{label: {label: string, type: string, id: string, required: boolean, col: string, editPossible: boolean}, zipCode: {label: string, type: string, id: string, title: string, col: string, editPossible: boolean, dataMask: string, dataMaskOptions: {clearIfNotMatch: boolean, placeholder: string}}, address: {label: string, type: string, id: string, col: string, editPossible: boolean}, number: {label: string, type: string, id: string, col: string, editPossible: boolean}, neighborhood: {label: string, type: string, id: string, col: string, editPossible: boolean}, complement: {label: string, type: string, id: string, col: string, editPossible: boolean}, city: {label: string, type: string, id: string, col: string, editPossible: boolean}, state: {label: string, type: string, id: string, col: string, editPossible: boolean}, country: {label: string, type: string, id: string, col: string, required: boolean, editPossible: boolean}, checkListItems: {editOnly: boolean, type: string, editPossible: boolean, fields: [*]}}}
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
        title: 'CEP só pode conter números',
        col: 'col-xs-6 col-md-2',
        editPossible: false,
        dataMask: '00000-000',
        dataMaskOptions: {
            clearIfNotMatch: true,
            placeholder: '_____-___'
        }
    },
    "address": {
        label: 'Endereço',
        type: 'text',
        id: 'address',
        col: 'col-xs-12 col-md-3',
        editPossible: false
    },
    "number": {
        label: 'Número',
        type: 'text',
        id: 'number',
        col: 'col-xs-3 col-md-2',
        editPossible: false
    },
    "neighborhood": {
        label: 'Bairro',
        type: 'text',
        id: 'neighborhood',
        col: 'col-xs-6 col-md-2',
        editPossible: false
    },
    "complement":{
        label: 'Complemento',
        type: 'text',
        id: 'complement',
        col: 'col-xs-3 col-md-3',
        editPossible: false
    },
    "city": {
        label: 'Cidade',
        type: 'text',
        id: 'city',
        col: 'col-xs-6 col-md-2',
        editPossible: false
    },
    "state": {
        label: 'Estado',
        type: 'text',
        id: 'state',
        col: 'col-xs-6 col-md-3',
        editPossible: false
    },
    "country": {
        label: 'País',
        type: 'text',
        id: 'country',
        col: 'col-xs-6 col-md-2',
        required: true,
        editPossible: false
    },
    "checkListItems": {
        editOnly: true,
        type: 'ARRAY',
        editPossible: true,
        fields: [
            {
                id: 'id',
                label: 15,
                display: 'hidden'
            },
            {
                id: 'name',
                label: 'Item',
                type: 'text'
            },
            {
                id: 'imageUrl',
                label: 'Imagem',
                type: 'img'
            },
            {
                id: 'description',
                label: 'Descrição',
                type: 'text'
            },
            {
                id: 'available',
                label: 'Existe?',
                type: 'bool',
                editPossible: true
            }
        ]
    }
};

Object.freeze(DragonflyAddressModel);

/**
 * Returns an array of options taking from the Model
 * @param baseValues should be passed if the the should be filled with some values
 * @returns {Array}
 * @constructor
 */
export const DAMGetFormOptions = (baseValues, isEdit = false) => {

    let options = [];

    // Loop through Model fields
    for(prop in DragonflyAddressModel) {

        let opt = {...DragonflyAddressModel[prop]};

        // if it's an add action
        if(!isEdit) {
            // add only if field is not editOnly
            if(!opt.editOnly) {
                if(baseValues) {
                    opt.val = baseValues[prop];
                }
            }
        }
        // if it' edit, show all
        else {
            if(baseValues) {
                opt.val = baseValues[prop];
            }
        }

        // add option
        options.push(opt);
    }

    return options;
};

/**
 * Search form the elements of the Model in the DOM and apply the masks
 * @constructor
 */
export const DAMApplyMasks = () => {

    // discover fields that must have mask
    let shouldHaveMask = Object.keys(DragonflyAddressModel).filter(key => !!DragonflyAddressModel[key].dataMask),
        willApplyMask = [];

    // get fields that will have masks applied
    for(field of shouldHaveMask) {
        willApplyMask.push(DragonflyAddressModel[field]);
    }

    willApplyMask.map(element => {

        let options = {};

        // if exists options for the mask
        if(element.dataMaskOptions) {
            Object.assign(options, element.dataMaskOptions);
        }

        // apply masks in the DOM
        $('#' + element.id).mask(element.dataMask, options);
    });
};

/**
 * Get all values from the DOM
 * @param addressId of the address being saved
 * @returns {{}}
 * @constructor
 */
export const DAMGetFilledFormValues = (addressId) => {

    // get all form data
    let formData = {};

    // Loop through all Model fields
    for(prop in DragonflyAddressModel) {

        // get only editPossible values
        if(DragonflyAddressModel[prop].editPossible) {

            // if it's array field
            if(DragonflyAddressModel[prop].type.toLowerCase() == 'array') {

                // get all checklistItem
                let checklistItems = $('[name=checklistItem]');

                let checklistResult = checklistItems.map((i, check) => {

                    check = $(check);

                    return { id: check.attr('refid'),
                            available: check[0].checked
                    };
                });

                // filter only checked items
                checklistResult = checklistResult.filter((i, checkItem) => checkItem.available);

                // get final checklist
                let checklistFinal = [];

                checklistResult.map((i, check) => checklistFinal.push(Number(check.id)));

                formData.availableItems = checklistFinal;
            }
            else {
                formData[prop] = $('#' + DragonflyAddressModel[prop].id).val();
            }

        }
    }

    // add id to the form regarding the address beign edited
    formData.id = addressId;

    return formData;
};