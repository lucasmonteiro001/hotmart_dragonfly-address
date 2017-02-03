import {FlowRouter} from 'meteor/kadira:flow-router';
import '../../../ui/globals/not-found';

FlowRouter.notFound = {
  action() {
    BlazeLayout.render( 'notFound');
  }
};
