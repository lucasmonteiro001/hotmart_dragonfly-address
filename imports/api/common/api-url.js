/**
 * Created by lucas on 2/3/17.
 */

const API_ADDRESS = process.env.API_ADDRESS;

const withId = id => `${API_ADDRESS}/${id}`;

const _insert = () => API_ADDRESS;
const _findAll = (page = 1, rows = 20) => `${API_ADDRESS}?page=${page}&rows=${rows}`;
const _findOne = id => withId(id);
const _update = id => withId(id);
const _delete = id => withId(id);


module.exports.insert = _insert;
module.exports.findAll = _findAll;
module.exports.findOne = _findOne;
module.exports.update = _update;
module.exports.delete = _delete;

export default {
    insert: _insert,
    findAll: _findAll,
    findOne: _findOne,
    update: _update,
    delete: _delete
}
