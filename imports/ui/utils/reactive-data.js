/**
 * Created by lucas on 2/3/17.
 */

/**
 * File that contains ReactiveVars used system-wide
 */

/**
 * Holds the address retrieved from the server
 * @type {ReactiveVar}
 */
export let Addresses = new ReactiveVar([]);

/**
 * Holds the number of addresses stored in the server
 * @type {ReactiveVar}
 */
export let Size = new ReactiveVar(0);

/**
 * Holds pagination data
 * @type {ReactiveVar}
 */
export let Page = new ReactiveVar(1);

/**
 * Holds pagination data
 * @type {ReactiveVar}
 */
export let Rows = new ReactiveVar(10);

/**
 * Holds instance of the map created to show location
 * @type {ReactiveVar}
 */
export let MapInstance = new ReactiveVar(null);
