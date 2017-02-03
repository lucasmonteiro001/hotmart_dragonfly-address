import { Template } from 'meteor/templating';
import './index.html';

Template.index.onRendered( () => {
    //Modules.client.login( { form: "#login", template: Template.instance() } );
    console.log("tela de index");
});

Template.index.events({
    
});
