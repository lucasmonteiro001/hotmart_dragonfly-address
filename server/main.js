import { Meteor } from 'meteor/meteor';
import '/imports/startup/server';
import Status from '../imports/api/common/status-code'
import Urls, {insert} from '../imports/api/common/api-url';

Meteor.startup(() => {
  // code to run on server at startup
    console.log(Status.get(400))
    console.log(Urls.findAll())
    console.log(insert())
});
