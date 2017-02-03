import {FlowRouter} from 'meteor/kadira:flow-router';

/**
 * Created by lucas on 5/5/16.
 */
Template.registerHelper( 'isCurrentUser', ( currentUser ) => {
    return currentUser === Meteor.userId();
});

Template.registerHelper('isLoggedIn', () => {
    return (Meteor.userId()) ? true : false;
});

Template.registerHelper('isAdministrador', () => {
   return Roles.userIsInRole( Meteor.userId(), 'administrador' );
});

Template.registerHelper('redirectLogin', () => {

    let msg = "Você deve estar autenticado para acessar este recurso!",
        type = "danger";

    FlowRouter.go('login');

    setTimeout(() => {
        Bert.alert(msg, type);
    }, 100);

});

Template.registerHelper('redirectNotAdmin', () => {

    let msg = "Você não possui autorização para acessar este recurso!",
        type = "danger";

    FlowRouter.go('index');

    setTimeout(() => {
        Bert.alert(msg, type);
    }, 100);

});

Template.registerHelper( 'disableIfAdmin', ( userId ) => {
    if ( Meteor.userId() === userId ) {
        return Roles.userIsInRole( userId, 'admin' ) ? "disabled" : "";
    }
});

Template.registerHelper( 'selected', ( v1, v2 ) => {
    return v1 === v2;
});