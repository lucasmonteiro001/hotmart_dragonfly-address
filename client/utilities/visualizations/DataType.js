/**
 * Created by lucas on 7/16/16.
 */

const quantitative = "quantitative",
        ordinal = "ordinal",
        nominal = "nominal",
        temporal = "temporal";

const dataTypes = [quantitative, ordinal, nominal, temporal];

export default class DataType {

    /**
     * Check if {dataType} is a allowed dataType defined  in dataTypes
     * @param dataType
     * @returns {boolean}
     */
    static isDataType(dataType) {

        // check if {dataType} is a allowed dataType
        // If it does not belong to dataType, return false
        return dataTypes.indexOf(dataType) !== -1;
    }

    static getAllowedDataTypes () {

        return dataTypes;

    }

}