import {FlowRouter} from 'meteor/kadira:flow-router';
import '../../../ui/globals/not-found';

FlowRouter.notFound = {
  action() {
      FlowRouter.go('index');
  }
};
