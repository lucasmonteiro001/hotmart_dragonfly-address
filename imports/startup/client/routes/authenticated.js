import {FlowRouter} from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor';
import '../../../ui/layouts/default';

const authenticatedRoutes = FlowRouter.group({
    name: 'authenticated',
});

authenticatedRoutes.route( '/', {
    name: 'index',
    action() {
        BlazeLayout.render( 'default', { yield: 'loader' } );
    }
});

authenticatedRoutes.route( '/loader', {
    name: 'loader',
    action() {
        BlazeLayout.render( 'default', { yield: 'loader' } );
    }
});

authenticatedRoutes.route( '/analysis', {
    name: 'analysis',
    action() {
        BlazeLayout.render( 'default', { yield: 'analysis' } );
    }
});
