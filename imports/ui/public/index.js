import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './index.html';
import '../public/dragonfly-address/list';
import { find } from '../utils/functions';

Template.index.onRendered( () => {
    //Modules.client.login( { form: "#login", template: Template.instance() } );

    setTimeout(() => {
        // Load initial data if has token
        if(Session.get('bearer')) {
            find();
        }
    }, 500);


});

Template.index.helpers({

    'show': () => {
        return Session.get('showLoading') || false;
    }
});
