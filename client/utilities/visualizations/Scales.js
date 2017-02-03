/**
 * Created by lucas on 7/16/16.
 */
const pow = "pow", sqrt = "sqrt", log = "log";

const scales = [pow, sqrt, log];

export default class Scales {

    /**
     * Check if the {scale} is a supported scale
     * @param scale
     * @returns {boolean}
     */
    static isScale(scale) {

        // check if {scale} is a allowed scale
        // If it does not belong to dataType, return false
        return scales.indexOf(scale) !== -1;
    }

    /**
     * Return an array with allowed scales supported by the system
     */
    static getAllowedScales() {

        return scales;

    }

}