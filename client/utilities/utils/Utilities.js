
const dl = require('datalib');

export default class Utilities {

    /**
     * Compare 3 different things in this method:
     * If val is a Number, checks if {val} < {compareTo}
     * If val is a String, split is by {compareTo} or ',' and compare the size of the create array against {compareTo}
     * If val is an Array, compare its size against compareTo
     * @param val
     * @param compareTo
     * @param delimiter
     * @returns {boolean}
     */
    static isLessThan (val, compareTo, delimiter) {

        if(isNaN(compareTo)) {
            throw "{compareTo} must be a Number";
        }

        if(typeof val === "string") {

            delimiter || (delimiter = ",");

            var length = val.split(delimiter).length;

            if(length < compareTo) {
                return true;
            }
            else {
                return false;
            }
        }
        else if ($.isArray(val)){
            return val.length < compareTo;
        }
        else {
            return val < compareTo;
        }

    }

    /**
     * Return only values from {content} that do not belong to {errors}
     * @param content must be an Array
     * @param errors must be a Set
     * @returns an array of correct values
     */
    static getCorrectValuesOnly (content, errors) {

        return content.filter(function(val, i) {
            return errors.has(i);
        });
    }

    /**
     * Given the first line, infer its value types and checks if every other line has the same type, if not, it's an
     * error. Also, converts integer to real if there's at least one real number in the column.
     *
     * The Set of Errors contains all line numbers from the csv file that have errors. Beware that in the
     * csv, the line numbers returned in this function should be added by 2. Example: If the line returned in the Set is
     * 2, that means that in the csv file this line is 4.
     * @param inferredValues
     * @param content
     * @returns {{errors: Set, inferredValues: (Array.<T>|ArrayBuffer|string|Blob|*)}}
     */
    static getErrorsAndInferredValues (inferredValues, content) {

        let firstLine = content[0],
            firstLineLength = firstLine.length,
            errors = new Set();

        // just copying the array
        let newInferredValues = inferredValues.slice();

        // Search for errors
        $.each(content, (i, line) => {

            // If line is empty, it's an error
            if(line === "" || line === []) {
                errors.add(i);
                return;
            }

            // If line's size is different of firstLineLength, it's an error
            if(line.length !== firstLineLength) {
                errors.add(i);
            }
            else { // If both lines have the same size

                var infValues = Utilities.inferValues(line);

                // For each inferred value of the current line
                $.each(infValues, (j, infValue) => {

                    // If the new inferred value is equal to the first line's inferred value, there is no error
                    if(infValue === inferredValues[j]) {
                        return;
                    }
                    else {
                        // Accepts that integer should be converted to real
                        if((infValue === "integer" || infValue === "real") &&
                            (inferredValues[j] === "integer" || inferredValues[j] === "real")) {

                            newInferredValues[j] = "real";
                        }
                        else { // If there's no match, it's an error
                            errors.add(i);
                        }
                    }
                });

            }
        });

        return {errors: errors, inferredValues: newInferredValues};
    }

    /**
     * Converts a CSV to JSON
     * @param header is the csv header, must be an string delimited by {delimiter}
     * @param content is the csv content, must be an array where each position represents a line, this position
     * should contain a string delimited by {delimiter}
     * @param delimiter of the csv lines
     * @returns {Array|*}
     */
    static csvToJSON (header, content, delimiter) {

        // recebe uma string e faz virar um array
        let keys;

        if(typeof header === "string") {
            keys = header.split(delimiter);
        }
        else {
            keys = header;
        }

        // obtem o array de objetos
        let json = content.map( (val) => {

            if(typeof val === "string") {
                val = val.split(delimiter);
            }

            let obj = {};

            // cria o objeto com suas propriedades
            $.each(val, function(index, value) {
                obj[keys[index].trim()] = value;
            });

            return obj;

        });

        return json;
    }

    /**
     * Try to infer the type of {val}
     * @param val
     * @returns {*}
     */
    static inferValue (val) {

        // return dl.type.infer(val);

        let inferedValue = null,
            aux = Number(val);

        // If val is a string, get rid of leading and trailing '"'
        if(val[0] === '"' && val[val.length - 1] === '"') {
            aux = Number(val.substring(1, val.length - 1));
        }

        // If val is a Number
        if(aux !== undefined && !isNaN(aux)) {

            // Check if val is Integer
            if((aux % 10).toString().indexOf(".") === -1) {
                inferedValue = "integer";
            }
            // Check if val is Real
            else if((aux % 10).toString().indexOf(".") >= 0) {
                inferedValue = "real";
            }
            else {
                inferedValue = undefined;
            }
        }
        else { // If val is not a number

            // TODO use momentjs library to make this cast
            aux = new Date(val);

            console.warn("Date should be in the following format: mm/dd/yyyy");

            // Check if val is a Date
            if(aux.getDate()) {
                inferedValue = "Date";
            }
            // Get rid of leading and trailing '"'
            else if(aux[0] === '"' && aux[val.length - 1] === '"') {
                aux = new Date(val.substring(1, val.length - 1));
            }

            // If val is a date
            if(aux.getDate()) {
                inferedValue = "Date";
            }
            // If none of the above checks matched, infer that val is a string
            else {
                inferedValue = "string";
            }
        }
        return inferedValue;
    }

    /**
     * Returns an array with the inferred values of each {array} element
     * @param array
     * @returns {*|Array}
     */
    static inferValues (array) {

        return array.map(function(val) {
            return Utilities.inferValue(val);
        });
    }

    /**
     * Split a {string} by a given {delimiter} and trim() every element
     * @param string
     * @param delimeter
     * @returns {*}
     */
    static split(string, delimeter) {

        if(!delimeter) {
            throw "{delimiter} is required!";
        }

        let arr = string.split(delimeter);

        // Trim the array
        arr = arr.map((val) => {
            return val.trim();
        });

        return arr;
    }

    /**
     * Split an array of strings given a {delimiter}
     * @param arr
     * @param delimiter
     * @returns {*|Array}
     */
    static splitAll(arr, delimiter) {

        if(!delimiter) {
            throw "{delimiter} is required!";
        }

        return arr.map((string) => {
            return Utilities.split(string, delimiter);
        });

    }

    /**
     * Update all the select values with the new inferred values
     * @param inferredValues
     */
    static updateSelectValues (inferredValues) {

        $.each(inferredValues, function(index, val) {

            $($('select')[index]).val(val);
        });
    }

}