/**
 * Created by lucas on 7/30/16.
 */
import './login.html';

Template.login.events({

    'submit form': (event) => {
        event.preventDefault();
        
        let email = $('#email').val();
        let password = $('#password').val();

        Meteor.loginWithPassword(email, password, function(error) {
            if(error) {
                Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-frown-o');
            }
            else {
                FlowRouter.go('loader');
            }
        });

    },
    'click #lognow'() {

        Meteor.loginWithPassword('monografia@dcc.ufmg.br', 'monografia', function(error) {
            if(error) {
                Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-frown-o');
            }
            else {
                FlowRouter.go('loader');
            }
        });
    }

});