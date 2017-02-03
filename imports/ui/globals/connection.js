/**
 * Created by lucas on 7/24/16.
 */
import './connection.html'

Template.connection.onCreated(()=>{

    Template.instance().status = () => {
        return Meteor.status().status;
    }

});

Template.connection.onRendered(()=>{

    let template = Template.instance();

    template.autorun(()=>{
        if(template.status() === "connected") {

            $('#connect').attr('status', 'online')
                        .addClass('online')
                        .removeClass('offline');
        }
        else {

            $('#connect').attr('status', 'offline')
                        .addClass('offline')
                        .removeClass('online');
        }
    });

});

Template.connection.events({

    "click #connect": function() {

        if($('#connect').attr('status') === "offline") {
            return Meteor.reconnect();
        }
        else {
            return Meteor.disconnect();
        }
    }
});

Template.connection.helpers({

    status: function() {
        return Template.instance().status();
    }

});