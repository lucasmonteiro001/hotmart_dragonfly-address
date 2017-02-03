/**
 * Created by lucas on 10/17/16.
 */
const FuzzySet = require('fuzzyset.js'),
    SCORE = 0.6;

let fuzzy = FuzzySet();

/*
const words = 'test, testimonial, hi, lucas, how, are, you, my, cool, weird, fake, awesome'
    .split(',')
    .map(str => {
        fuzzy.add(str.trim());
    });
*/

module.exports.fuzzy = fuzzy;

module.exports.getWordGreaterThan = function getWordGreaterThan (word, greaterThan = SCORE) {

    let result = fuzzy.get(word);

    if(!result || result.length === 0) {
        return null;
    }

    result = result[0];

    let score = result[0],
        foundWord = result[1];

    if(score >= greaterThan) {
        return {
            score,
            word: foundWord
        };
    }
    else {
        return null;
    }

};