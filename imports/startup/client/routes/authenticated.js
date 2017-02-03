import {FlowRouter} from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor';
import '../../../ui/layouts/default';
import '../../../ui/authenticated/loader';
import '../../../ui/authenticated/analysis';

const blockUnauthorizedAdmin = ( context, redirect ) => {

    if (!Roles.userIsInRole( Meteor.userId(), 'administrador' ) ) {
        Bert.alert('Você não possui autorização para acessar este recurso!', 'danger')
        redirect('index');
    }

};

const authenticatedRedirect = ( context, redirect ) => {
    if ( !Meteor.userId() ) {
        Bert.alert('Você deve estar autenticado para acessar este recurso!', 'danger');
        redirect('login');
    }
};

const authenticatedRoutes = FlowRouter.group({
    name: 'authenticated',
    triggersEnter: [ authenticatedRedirect ]
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
