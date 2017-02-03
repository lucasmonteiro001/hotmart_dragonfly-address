/**
 * Created by lucas on 7/16/16.
 */
import DataType from './DataType';

export default class Dimension {

    properties() {

        this._data = null;
        this._dataType = null;

    }

    constructor (data = "", dataType = "") {

        this.properties();

        if(data === "" || dataType === "") {
            throw "{data} and {dataType} are required";
        }

        // TODO fazer o type cast dos valores do data para o dataType

        this.data = data;
        this.dataType = dataType;
    }

    set data (data) {
        this._data = data;
    }

    get data() {
        return this._data;
    }

    set dataType (dataType) {

        if(!DataType.isDataType(dataType)) {
            throw "Allowed data types: " + DataType.getAllowedDataTypes();
        }

        this._dataType = dataType;
    }

    get dataType () {
        return this._dataType;
    }

    count () {
        console.warn("Should be implemented using the groupBy function by d3.js");
    }

    max () {
        throw "Unsupported operation!";
    }

    min () {
        throw "Unsupported operation!";
    }

    sum () {
        if(this.dataType !== "quantitative") {
            throw `Unsupported operation for dataType:{${this.dataType}}`;
        }

        console.warn("TBD");
    }

    mean () {
        if(this.dataType !== "quantitative") {
            throw `Unsupported operation for dataType:{${this.dataType}}`;
        }

        console.warn("TBD");
    }

    median () {
        if(this.dataType !== "quantitative") {
            throw `Unsupported operation for dataType:{${this.dataType}}`;
        }

        console.warn("TBD");
    }

    quantile () {
        if(this.dataType !== "quantitative") {
            throw `Unsupported operation for dataType:{${this.dataType}}`;
        }

        console.warn("TBD");
    }

    variance () {
        if(this.dataType !== "quantitative") {
            throw `Unsupported operation for dataType:{${this.dataType}}`;
        }

        console.warn("TBD");
    }

    deviation () {
        if(this.dataType !== "quantitative") {
            throw `Unsupported operation for dataType:{${this.dataType}}`;
        }

        console.warn("TBD");
    }


}