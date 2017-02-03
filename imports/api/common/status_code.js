/**
 * Created by lucas on 2/3/17.
 */
const status = {
    400: {
        detail: 'Bad Request - When the request is incorrect. It can be, for example, due to missing a mandatory parameter or an invalid format.',
        reason: 'Requisição mal formatada'
    },
    401: {
        detail: 'Unauthorized - When the request has no access token',
        reason: 'Sem token de acesso. Refaça o login!'
    },
    403: {
        detail: 'Forbidden - In case the logged user is not owner of the address',
        reason: 'Você não tem permissão para acessar este endereço!'
    },
    404: {
        detail: 'Not Found - When address does not exist',
        reason: 'Endereço inexistente!'
    },
    405: {
        detail: 'No resource method found for PUT, return 405 with Allow header',
        reason: 'No resource method found for PUT, return 405 with Allow header'
    },
    500: {
        detail: 'Server Error - When an internal server error occur',
        reason: 'Erro interno!'
    }
};

module.exports = {
    /** @type number */
    get(status_code) {
        return status[status_code];
    }
}
