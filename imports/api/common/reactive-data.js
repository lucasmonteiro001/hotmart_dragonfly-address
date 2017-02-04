/**
 * Created by lucas on 2/3/17.
 */

// st is an abbreviation for state

export const st_login_values = {
    default: 'Login',
    onChange: 'Processando ...'
};
export let st_login = new ReactiveVar(st_login_values.default);
