/**
 * Created by lucas on 2/3/17.
 */

Bert.defaults = {
    hideDelay: 3500,
    style: 'growl-bottom-right',
    type: 'default'
};

/**
 * Shows warning message
 * @param msg
 */
const warning = (msg) => Bert.alert({
    title: 'Atenção',
    message: msg,
    type: 'warning',
});

/**
 * Shows info message
 * @param msg
 */
const info = (msg) => Bert.alert({
    message: msg,
    type: 'info',
});

/**
 * Shows success message
 * @param msg
 */
const success = (msg) => Bert.alert({
    message: msg,
    type: 'success',
});

/**
 * Shows default message
 * @param msg
 * @private
 */
const _default = (msg) => Bert.alert({
    message: msg,
    type: 'default',
});

/**
 * Shows danger message
 * @param msg
 */
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