/**
 * Created by lucas on 7/23/16.
 */
import './default.html';
import '../globals/header';
import '../globals/loading.html';
import '../globals/connection';
import '../globals/footer';

const handleRedirect = (routes, redirect) => {
    let currentRoute = FlowRouter.getRouteName();

    if (routes.indexOf(currentRoute) > -1) {
        FlowRouter.go(redirect);
    }
    else
        return false;
};

Template.default.events({

});

Template.default.helpers({
    loggingIn() {
        return Meteor.loggingIn();
    },  
    authenticated() {
        return !Meteor.loggingIn() && Meteor.user();
    },
    redirectAuthenticated() {
        return handleRedirect([
            'login',
            'signup'
        ], '/loader');
    },
    redirectPublic() {
        return handleRedirect([
            'index',
            'loader',
        ], '/login');
    }
});

Template.default.onRendered(() => {


})