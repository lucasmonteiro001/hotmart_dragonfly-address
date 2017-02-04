/**
 * Created by lucas on 2/3/17.
 */

Bert.defaults = {
    hideDelay: 3500,
    style: 'growl-bottom-right',
    type: 'default'
};

const warning = (msg) => Bert.alert({
    title: 'Atenção',
    message: msg,
    type: 'warning',
});

const info = (msg) => Bert.alert({
    message: msg,
    type: 'info',
});

const success = (msg) => Bert.alert({
    message: msg,
    type: 'success',
});

const _default = (msg) => Bert.alert({
    message: msg,
    type: 'default',
});

const danger = (msg) => Bert.alert({
    title: 'Erro',
    message: msg,
    type: 'danger',
});

export default {
    info,
    warning,
    success,
    danger,
    default: _default
}