/**
 * Created by lucas on 9/27/16.
 */
import './loader.html';
import HorizontalBar from '../../../client/utilities/visualizations/HorizontalBar';
import BarChart from '../../../client/utilities/visualizations/BarChart';
import PieChart from '../../../client/utilities/visualizations/PieChart';
import Utilities from '../../../client/utilities/utils/Utilities';
import DataSet from '../../../client/utilities/visualizations/DataSet';
import Table from '../../../client/utilities/utils/Table';
import DefaultValues from '../../../client/utilities/utils/DefaultValues';


const d3 = require('d3');

let template;

Template.loader.onCreated(() => {

    template = Template.instance();

    template.podeIrProxPagina = new ReactiveVar(false);

});

Template.loader.onRendered(() => {


    $("#csvFile").change((e) => {

        let table = $("table"),
            thead = $(table).find("thead"),
            tbody = $(table).find("tbody"),
            fileExtension = $("input#csvFile").val().split(".").pop().toLowerCase();

        // Accepts only csv files
        if($.inArray(fileExtension, ["csv"]) === -1) {
            alert('Upload CSV');
            return false;
        }

        // After reading the file
        if (e.target.files !== undefined) {

            $(thead).empty();
            $(tbody).empty();

            // Object to read from file
            let reader = new FileReader(),
                file = e.target.files.item(0);

            reader.readAsText(file);

            // After loading the file
            reader.onload = (evt) => {

                $('input').val("");

                // Get lines from csv
                let csvval = evt.target.result.split("\n"),
                    header = Utilities.split(csvval[0], DefaultValues.DELIMITER);

                if(!Utilities.isLessThan(header, DefaultValues.MAX_COLS, DefaultValues.DELIMITER)) {
                    alert('File\'s columns should not exceed 10! ');
                    return false;
                }

                dataSet = new DataSet(file.name, file.type);

                // TODO Check if global variable below is needed
                global.dataSet = dataSet;

                dataSet.rawRowData = evt.target.result;
                dataSet.rows = csvval.length;
                dataSet.rowData = Utilities.splitAll(csvval, DefaultValues.DELIMITER);
                dataSet.columns = header.length;

                // Free up space
                csvval = null;

                Table.writeInferredValues(dataSet.inferredValues, table, dataSet.header, DefaultValues.DATA_TYPES);
                
                let res = Utilities.getErrorsAndInferredValues(dataSet.inferredValues, dataSet.data);

                dataSet.inferredValues = res.inferredValues;

                Utilities.updateSelectValues(dataSet.inferredValues);

                Table.writeInvalidRows(res.errors, dataSet.data);

                Table.writeValidRows(res.errors, dataSet.data);

                monitorEvents();

                template.podeIrProxPagina.set(true);

            };
        }
    });
});

Template.loader.events({

    'click #file-sample'() {

    }

});

Template.loader.helpers({
    podeIrProxPagina() {
        return template.podeIrProxPagina.get();
    },
    DATA_SET() {
        return DATA_SET.get();
    }
});

const monitorEvents = () => {

    // Monitor select changing
    $('#inferredType').find('select').change((e) => {

        let select = e.target,
            id = select.id,
            index = id.split("-")[1];

        // Update inferredValues with new selected value from select menu
        dataSet.inferredValues[index] = select.value;

        $('.hierarchicalRow').remove();
        // $('.isHierarchical').find('[type="checkbox"]')[0].checked = false;
    });

};

function gerarGraficos() {
    let familyMembers = ['Jon', 'James', 'Robert', 'Mary'];

    familyMembers = familyMembers.map(function(member, i) {
        return {key: member, value: i + 1};
    });

    $(document).ready(function () {

        let barras = new HorizontalBar("#container-visualizacao", familyMembers);
        let c = new HorizontalBar("#cool", familyMembers);
        let graficoBarras = new BarChart("#container-bar-chart", familyMembers);
        let graficoPizza = new PieChart("#container-pie-chart", familyMembers);

        console.log(barras);
        console.log(c);

        global.ordenaValueDSC = function ordenaValueDSC() { c.sort("valueDSC"); };
        global.ordenaValueASC = function ordenaValueASC() { c.sort("valueASC"); };
        global.ordenaNameDSC = function ordenaNameDSC() { c.sort("nameDSC"); };
        global.ordenaNameASC = function ordenaNameASC() { c.sort("nameASC"); };

        // Ordena gráfico de barras
        global.ordenaBarValueDSC = function ordenaBarValueDSC() { graficoBarras.sort("valueDSC"); };
        global.ordenaBarValueASC = function ordenaBarValueASC() { graficoBarras.sort("valueASC"); };
        global.ordenaBarNameDSC = function ordenaBarNameDSC() { graficoBarras.sort("nameDSC"); };
        global.ordenaBarNameASC = function ordenaBarNameASC() { graficoBarras.sort("nameASC"); };

        d3.interval(function () {

            familyMembers = ['Jon', 'James', 'Robert', 'Mary'];
            familyMembers = familyMembers.map(function(member, i) {
                return {key: member, value: Math.floor(Math.random() * (10 - 0)) + 0};
            });

            barras.update(familyMembers);

        }, 1500);
    });
}