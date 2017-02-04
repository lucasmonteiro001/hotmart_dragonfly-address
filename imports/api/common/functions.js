/**
 * Created by lucas on 2/4/17.
 */
import { Session } from 'meteor/session';

export const showLoading = (bool = false) => Session.set('showLoading', bool);