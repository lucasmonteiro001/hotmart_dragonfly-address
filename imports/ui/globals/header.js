import { Template } from 'meteor/templating';
import './header.html';

Template.header.onCreated(() => {

});

Template.header.helpers({
    'email': function () {
        return Meteor.user().emails[0].address;
    }
});

Template.header.onRendered(() => {

    console.log(TAPi18n.__('title'))
});

Template.header.events({
    'click #logout': () => {
        Meteor.logout();
        FlowRouter.go('index')
    },
    'click span.sysLang': (evt) => {

        evt.preventDefault();

        TAPi18n.setLanguage(evt.target.id);
    }
});