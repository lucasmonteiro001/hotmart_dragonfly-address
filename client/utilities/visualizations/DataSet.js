/**
 * Created by lucas on 7/16/16.
 */

import Utilites from '../utils/Utilities';

export default class DataSet {

    properties() {

        this._rowData = null;
        this._rawRowData = null;
        this._rows = null;
        this._columns = null;
        this._format = null;
        this._path = null;
        this._dimensions = null; // must be an array of Dimension
        this._inferredValues = null;

    }


    constructor(path, format) {

        this.properties();

        this.format = format;
        this.path = path;

    }

    get toJSON() {

        return Utilites.csvToJSON(this.header, this.data);
    }

    get dimensions() {

        return this._dimensions;
    }

    set dimensions(dimensions) {

        this._dimensions = dimensions;
    }

    get path() {

        return this._path;
    }

    set path(path) {

        this._path = path;
    }

    get format() {

        return this._format;
    }

    set format(format) {

        this._format = format;
    }

    get columns() {

        return this._columns;
    }

    set columns(columns) {

        this._columns = columns;
    }

    get rows() {

        return this._rows;
    }

    set rows(rows) {

        this._rows = rows;
    }

    get header() {

        return this.rowData[0];
    }

    get rawRowData() {

        return this._rawRowData;
    }

    set rawRowData(rawRowData) {

        this._rawRowData = rawRowData;
    }

    get rowData() {

        return this._rowData;
    }

    set rowData(rowData) {

        this._rowData = rowData;
    }

    get inferredValues() {

        this._inferredValues || (this._inferredValues = Utilites.inferValues(this.rowData[1]));

        return this._inferredValues;

    }

    set inferredValues(inferredValues) {

        this._inferredValues = inferredValues;

    }


    /**
     * Get from rowData[1] until its length. In this case, this method does not return only the header
     * @returns {Array.<T>|*}
     */
    get data() {

        let clone = JSON.parse(JSON.stringify(this.rowData));

        return clone.splice(1);
    }
}