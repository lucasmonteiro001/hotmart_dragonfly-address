/**
 * Created by lucas on 10/17/16.
 */
import { Meteor } from 'meteor/meteor';
import { Terms } from '../../../api/terms/terms';

const SCORE = 0.6;

const RETURN_CODES = {
    success: "success",
    warning: "warning",
    error: "danger",
    info: "info"
};

const INT = "integer",
    STRING = "string",
    DATE = "Date",
    REAL = "real",
    SCATTERPLOT = "scatter-plot",
    LINECHART = "line-chart",
    VERTICALBARCHART = "bar-chart",
    HORIZONTALBARCHART = "horizontal-bar-chart",
    AREACHART = "area-chart",
    BARCHART = "bar-chart",
    PIECHART = "pie-chart",
    BOXPLOT="box-plot",
    DIVERGING="diverging-bar",
    DONUTCHART="donut-chart",
    GROUPED="grouped-bar-chart",
    MOTION="motion-chart",
    STACKED="stacked-area",
    STREAM="stream-graph";

const CHARTS = {

    [SCATTERPLOT]: [
        [INT, INT], [INT, REAL], [REAL, INT], [REAL, REAL]
    ],
    [LINECHART]: [
        [STRING, INT], [STRING, REAL], [DATE, INT], [DATE, REAL], [INT, INT], [INT, REAL]
    ],
    [VERTICALBARCHART]: [
        [STRING, INT], [STRING, REAL], [DATE, INT], [DATE, REAL], [INT, INT], [INT, REAL]
    ],
    [HORIZONTALBARCHART]: [
        [STRING, INT], [STRING, REAL], [DATE, INT], [DATE, REAL], [INT, INT], [INT, REAL]
    ],
    [PIECHART]: [
        [INT, REAL], [STRING, REAL], [DATE, INT], [DATE, REAL], [INT, INT]
    ]
};

const fuzzy = require('./fuzzy');

const f = (term, charts) => {
    terms.push({term, charts});
};

//FIXME aquisicao de termos eh estatica
// let terms = Terms.find().fetch();
terms = [];

const ALL = [AREACHART, VERTICALBARCHART, BOXPLOT, DIVERGING, DONUTCHART, GROUPED, HORIZONTALBARCHART, LINECHART, MOTION, PIECHART, SCATTERPLOT, STACKED, STREAM];

f("correlation", [SCATTERPLOT]);
f("deviation", [LINECHART]);
f("distribution", [LINECHART, VERTICALBARCHART]);
f("ranking", [HORIZONTALBARCHART]);
f("time series", [LINECHART, VERTICALBARCHART, AREACHART]);
f("part-to-whole", [PIECHART, VERTICALBARCHART]);
f("Accessing details on demand", ALL);
f("Adding variables", ALL);
f("Aggregating", ALL);
f("Alternating differences", BARCHART, SCATTERPLOT, STACKED);
f("Center", BARCHART, LINECHART, SCATTERPLOT);
f("Comparing", [AREACHART, VERTICALBARCHART, BOXPLOT, DIVERGING, DONUTCHART, GROUPED, HORIZONTALBARCHART, LINECHART, MOTION, PIECHART, STACKED, STREAM]);
f("Correlation", SCATTERPLOT);
f("Covariation", GROUPED, SCATTERPLOT);
f("Details-On-Demand", [AREACHART, VERTICALBARCHART, BOXPLOT, DIVERGING, DONUTCHART, GROUPED, HORIZONTALBARCHART, LINECHART, MOTION, PIECHART, SCATTERPLOT, STACKED, STREAM]);
f("Deviation", LINECHART);
f("Distribution", BARCHART, LINECHART);
f("Exceptions", ALL);
f("Filter", ALL);
f("Filtering", ALL);
f("Gaps", BARCHART, LINECHART, SCATTERPLOT);
f("Increasingly different", BARCHART, SCATTERPLOT);
f("Non-uniformly different", BARCHART, SCATTERPLOT);
f("Overlapped time scales", LINECHART);
f("Part-to-whole", PIECHART, BARCHART, STACKED);
f("Ranking", BARCHART);
f("Re-expressing", ALL);
f("Re-scaling", LINECHART);
f("Re-visualizing", ALL);
f("Reference lines and regions", ALL);
f("Sorting", BARCHART);
f("Spread", BARCHART, SCATTERPLOT);
f("Time series", AREACHART, BARCHART, LINECHART);
f("Trend", LINECHART);
f("Uniform", BARCHART, HORIZONTALBARCHART, SCATTERPLOT);
f("Variability", BARCHART, LINECHART);

if(terms && terms.length > 0) {

    terms.map(term => {
        fuzzy.fuzzy.add(term.term)
    });
}

Meteor.methods({
    'chat.handleInputMsg' (msg) {

        msg = msg.trim();

        let wordMatch = fuzzy.getWordGreaterThan(msg);

        if(wordMatch) {

            let score = wordMatch.score,
                word = wordMatch.word;

            if(score >= SCORE) {

                if(score === 1) {

                    // get word from database and discover if it has any associated chart
                    // FIXME
                    // let term = Terms.findOne({term: new RegExp(word, 'i')}),
                    let chartOptions = [];

                    // procura pelo termo na lista de termos
                    let result = terms.filter(term => word.match(new RegExp(term.term, "i")));

                    if(result.length >= 0) {

                        result = result[0];

                        // se o termo possui graficos listados, retorna-os
                        if(result.charts && result.charts.length > 0) {

                            chartOptions = result.charts;
                        }
                    }

                    return {operation: "shouldShowChartOptions", chartOptions};
                }
                else {
                    return formatMessage(RETURN_CODES.warning, 'Did you mean:\n\t\t - ' + word);
                }
            }
            else {

                return formatMessage(RETURN_CODES.error, 'No word found!');
            }
        }
        else {

        }


        return formatMessage(RETURN_CODES.error, 'No word found!');

    },
    'chat.existsChart' (name) {

        if(!CHARTS[name]) {
            throw new Error('Chart does not exist!');
        }

        return CHARTS[name];

    }

});

const formatMessage =  function formatMessage (type, msg, result) {

    let operation = "msg";

    return {operation, type, msg, result};

};

const proceed = function proceed (word) {

    // check if word exists
    // get synonymous if word  does not exist in database
    // get possible visualizations
    // suggest them
};