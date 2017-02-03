import {FlowRouter} from 'meteor/kadira:flow-router';
import '../../../ui/public/index';
import '../../../ui/layouts/default';
import '../../../ui/globals/login';

const publicRedirect = ( context, redirect ) => {
    if ( Meteor.userId() ) {
        redirect('index');
    }
};

const publicRoutes = FlowRouter.group({
    name: 'public',
    triggersEnter: [ publicRedirect ]
});

publicRoutes.route( '/login', {
    name: 'login',
    action() {
        BlazeLayout.render('login');
    }
});