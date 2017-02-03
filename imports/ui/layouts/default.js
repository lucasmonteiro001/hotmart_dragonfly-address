/**
 * Created by lucas on 7/23/16.
 */
import './default.html';
import '../globals/header';
import '../globals/loading.html';
import '../globals/connection';
import '../globals/footer';


Template.default.events({

});

Template.default.helpers({
    loggingIn() {
        return Meteor.loggingIn();
    }
});

Template.default.onRendered(() => {


})