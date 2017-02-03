/**
 * Created by lucas on 9/27/16.
 */
import '/imports/startup/client/index';
import '/node_modules/bootstrap/dist/js/bootstrap.min';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';

let userLang = getUserLanguage();

console.log(userLang)

TAPi18n.setLanguage(userLang)
    .done(function () {
        console.log('deu certo');
    })
    .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
    });