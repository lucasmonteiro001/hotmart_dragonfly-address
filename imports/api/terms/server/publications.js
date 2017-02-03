/**
 * Created by lucas on 10/17/16.
 */
import { Terms } from '../terms';

Meteor.publish( 'Terms', function(filter, projection){

    projection || (projection = {});

    filter || (filter = {});

    // se existe um filtro
    if( typeof filter === "object") {

        if(Object.keys(projection).length === 0) {

            if (Object.keys(filter).length === 0) {

                return Terms.find();
            } else {

                return Terms.find(filter);
            }
        }
        else {
            return Terms.find(filter, {fields: projection});
        }
    }
    else {
        return null;
    }
});