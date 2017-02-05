/**
 * Created by lucas on 2/3/17.
 */

// get API address
const API_ADDRESS = process.env.API_ADDRESS;

/**
 * Returns string in the forme of $API_ADDRESS/$id
 * @param id
 */
const withId = id => `${API_ADDRESS}/${id}`;

/**
 * API endpoint to insert
 * @private
 */
const _insert = () => API_ADDRESS;

/**
 * API endpoint to find all address given pagination and rows
 * @param page
 * @param rows
 * @private
 */
const _findAll = (page = 1, rows = 20) => `${API_ADDRESS}?rows=${rows}&page=${page}`;

/**
 * API endpoint to find one address by $id
 * @param id
 * @private
 */
const _findOne = id => withId(id);

/**
 * API endpoint to update an address
 * @param id
 * @private
 */
const _update = id => withId(id);

/**
 * API endpoint to delete an address by id
 * @param id
 * @private
 */
const _delete = id => withId(id);


/**
 * Exports all functions separetely
 * @type {()=>string}
 */
module.exports.insert = _insert;
module.exports.findAll = _findAll;
module.exports.findOne = _findOne;
module.exports.update = _update;
module.exports.delete = _delete;

/**
 * Exports all functions as default
 */
export default {
    insert: _insert,
    findAll: _findAll,
    findOne: _findOne,
    update: _update,
    delete: _delete
}
