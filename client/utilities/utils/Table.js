/**
 * Created by lucas on 7/15/16.
 */
import DOMElements from './DOMElements';

const range = require('lodash/range');

export default class Table {

    /**
     * Write the inferred select values in the first row of the table
     * @param inferredValues
     * @param table
     * @param header
     * @param datatypes
     */
    static writeInferredValues (inferredValues, table, header, datatypes) {

        let thead = $(table).find("thead"),
            tbody = $(table).find("tbody"),
            headerRow = DOMElements.new("tr");

        // Build the header row of the table
        $.each(header, (index, val) => {
            $(headerRow).append(DOMElements.new("th", {text: val, class: "text-center"}));
        });

        $(thead).append(headerRow);

        let rowSelects = DOMElements.new("tr", {id: "inferredType"});

        // Create all select's
        $.each(range(header.length), (index) => {

            let select = DOMElements.new("select", {id: `inferredValues-${index}`});

            // For each available option
            $.each(datatypes, (i, val) => {
                select.append(DOMElements.new("option", {text: val, value: val}));
            });

            let td = DOMElements.new("td");

            td.append(select);

            rowSelects.append(td);

        });

        $(tbody).append(rowSelects);

        // Select the infered value for each given column
        $.each(inferredValues, (index, val) => {

            $($('#inferredType').find('select')[index]).val(val);
        });

    }

    /**
     * Draw a checkbox as the first row of the table
     */
    static drawHierarchicalCheckbox () {

        let tbody = $("tbody"),
            row = DOMElements.new("tr", {class: "text-left isHierarchical"}),
            checkbox = DOMElements.new("checkbox"),
            text = DOMElements.new("span", {text: "\tIs the data hierarchical?"});

        row.append(checkbox);
        row.append(text);
        tbody.append(row);
    }

    /**
     * Write only rows that belong to errors
     * @param errors
     * @param content
     */
    static writeInvalidRows (errors, content) {

        let tbody = $('tbody');

        // Print each invalid row (which contains an error)
        errors.forEach(function(i) {

            let val = content[i];

            if(val === "" || val === []) {
                return;
            }

            let newLine = DOMElements.new("tr", {class: "error"});

            $.each(val, function(index, data) {

                if(index === 0) {

                    let lineNumberInCSV = DOMElements.new('span', {text: (i + 2), class: 'cssRow'}),
                        td = DOMElements.new('td', {text: data});

                    newLine.append(td);

                    td.prepend(lineNumberInCSV);
                }
                // imprime o numero da linha
                else {

                    newLine.append(DOMElements.new('td', {text: data}));
                }
            });

            tbody.append(newLine);

        });

    }

    /**
     * Write only rows that do not belong to errors
     * @param errors
     * @param content
     */
    static writeValidRows(errors, content) {

        let tbody = $('tbody');

        $.each(content, function(i, val) {

            // if line does not contain an error
            if(!errors.has(i)) {

                if(val === "") {
                    return;
                }

                let newLine = DOMElements.new('tr', {class: "right"});

                // Print each element of the row
                $.each(val, function(index, data) {

                    if(index === 0) {

                        let lineNumberInCSV = DOMElements.new('span', {text: (i + 2), class: 'cssRow'}),
                            td = DOMElements.new('td', {text: data});

                        newLine.append(td);

                        td.prepend(lineNumberInCSV);
                    }
                    // imprime o numero da linha
                    else {

                        newLine.append(DOMElements.new('td', {text: data}));
                    }
                });

                tbody.append(newLine);
            }

        });


    }

    static writeHierarchicalRow (header, inferredValues) {

        let tbody = $("tbody"),
            button = DOMElements.new('button', {text: 'Generate object', id: 'genHierarchicalObj'});

        // Remove previous hierarchical row
        $('.hierarchicalRow').remove();

        // Get non-number cols
        let validCols = header.filter( (val, index) => {
            if(inferredValues[index] === "Date" || inferredValues[index] === "string") {
                return true;
            }
        });

        let hierarchicalRow = DOMElements.new('tr', {class: 'hierarchicalRow'});

        // For each valid column
        $.each(validCols, (index, val) => {

            let newTd = DOMElements.new('td', {text: val}),
                newSelect = DOMElements.new('select', {value: val});

            // Append the first value for each select
            newSelect.append(DOMElements.new('option', {value: '#', text: '#'}));

            // Add the missing select values
            $.each(validCols, (i, v) => {

                newSelect.append(DOMElements.new('option', {value: v, text: v}));
            });

            newTd.append(newSelect);

            hierarchicalRow.append(newTd);

        });

        hierarchicalRow.append(button);

        tbody.find('tr').eq(0).after(hierarchicalRow);
    }

}