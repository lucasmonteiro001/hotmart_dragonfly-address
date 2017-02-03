/**
 * Created by lucas on 10/5/16.
 */
import './analysis.html';
import 'jquery-ui';
import Charts from '../../../client/utilities/visualizations/Charts';
import { Terms } from '../../api/terms/terms';

console.log(Charts)

const MAX_COLS = 2;

let template;

Template.analysis.onCreated(() => {

    template = Template.instance();

    // se o grafico possui algum grafico para renderizar
    template.shouldShowChartOptions = new ReactiveVar(false);

    // nome do grafico para ser desenhado
    template.chartName = new ReactiveVar(null);

    // opcoes de graficos disponiveis para determinado termo
    template.chartOptions = new ReactiveVar(null);

    // possiveis configuracoes para renderizar o grafico selecionado
    template.possibleColumns = new ReactiveVar(null);

    try {
        if(!dataSet) {
            FlowRouter.go('loader');
        }
    }
    catch (e) {
        FlowRouter.go('loader');
    }

});

Template.analysis.helpers({
    columns() {
        return dataSet.header.map((name, idx) => {
            return { name, idx };
        });
    }
});

Template.analysis.events({
    'click #see'() {

        Modal.show('termsModal');

    },
    'change input[type="checkbox"]': () => {

        // selected checkbox
        let selected = $('input[type="checkbox"]:checked');

        // if reached MAX_COLS, disabled other checkboxes
        if(selected.length === MAX_COLS) {

            let notSelected = $('input[type="checkbox"]:not(:checked)');

            notSelected.prop('disabled', true);
        }
        // enable all checkboxes
        else if(selected.length < MAX_COLS){

            $('input[type="checkbox"]').prop('disabled', false);
        }
        else {
            alert("IT'S NOT POSSIBLE TO CONTINUE FROM HERE");
            navigator.reload();
        }
    },
    'submit form#chat' (evt) {

        evt.preventDefault();

        let $chatMsg = $('#chat-msg'),
            msg = $chatMsg.val().trim();

        $chatMsg.val('');

        addToChat(msg, true);

        if(msg === "clear") {

            $('.result').find('p').remove();
            return;
        }

        /**
         * ESTADOS DA APLICACAO
         */
        // se o chat esta em modo de escolher um grafico
        if(template.shouldShowChartOptions.get()) {

            handleChart(msg);
            return;
        }
        // se o usuario tem opcoes disponiveis para escolher
        else if(template.possibleColumns.get()) {

            let selectedColumns = getSelectedColumns();

            // eh necessario selecionar 2 colunas
            if(selectedColumns.length !== MAX_COLS) {

                addToChat("Select " + MAX_COLS + " columns!", false, 'danger');

                reset();

                return;
            }
            else {

                draw();
            }

            return;
        }

        reset();

        Meteor.call('chat.handleInputMsg', msg, (err, result) => {

            if(err) {
                Bert.alert(err.reason, 'danger');
                return;
            }

            if(result.operation === 'msg') {

                addToChat(result.msg, false, result.type);

                template.shouldShowChartOptions.set(false);
            }
            else if(result.operation === 'shouldShowChartOptions'){

                template.shouldShowChartOptions.set(true);

                // build chart options
                let chartOptions = "";

                if(result.chartOptions && result.chartOptions.length > 0 ) {

                    template.chartOptions.set(result.chartOptions);

                    //show chart options
                    chartOptions = result.chartOptions.map((chart, i) => {
                        return '\t' + i + ' - ' + chart;
                    });

                    addToChat('Available options, choose one from below:\n' + chartOptions.join('\n'), false, 'info');
                }
                else {
                    addToChat('No available chart at this moment!', false, 'danger');
                    reset();
                }
            }

        });
    }
});

const scrollChat = function scrollChat (chat) {

    (chat).stop().animate({
        scrollTop: $(chat)[0].scrollHeight
    }, 800);

};

const addToChat = function addToChat (text, isClient, type) {

    let $chat = $('.result'),
        p = $('<p>'),
        $p = $(p),
        span = $('<span>').text(text),
        $span = $(span);

    $p.addClass( (isClient) ? 'client' : 'server');

    if(type !== undefined && type !== null && type !== "") {
        $span.addClass('alert').addClass('alert-' + type);
    }

    $p.append($span);

    $chat.append($p);

    scrollChat($chat);

};

const handleChart = (msg) => {

    let chartOption = Number(msg);

    // Se nao eh uma opcao valida
    if(isNaN(chartOption) || chartOption < 0 || chartOption > template.chartOptions.get().length - 1) {

        addToChat("Invalid option!", false, 'danger');

        reset();

        return;
    }

    // se eh um grafico valido, descobre seu nome
    let chartName = template.chartOptions.get()[chartOption];

    Meteor.call('chat.existsChart', chartName, (err, result) => {

        if(err) {
            addToChat('Chart does not exist yet!', false, 'danger');
            return;
        }

        template.chartName.set(chartName);

        template.possibleColumns.set(result);

        // tenta desenhar o grafico se há o número necessário de colunas selecionadas
        let selectedColumns = getSelectedColumns();

        // eh necessario selecionar 2 colunas
        if(selectedColumns.length !== MAX_COLS) {

            addToChat("Select " + MAX_COLS + " columns and restart the process!", false, 'danger');

            reset();
        }
        else {

            draw();
        }

    });

    reset();
};

const reset = () => {
    template.shouldShowChartOptions.set(false);
    template.chartName.set(null);
    template.chartOptions.set(null);
    template.possibleColumns.set(null);
};

const getSelectedColumns = () => {

    let columns = $('input[type="checkbox"]');

    let result = columns.map((i, el) => {

        // descobre os indexes dos checkboxes marcados
        if($(el).attr('disabled') != "disabled") {

            return i;
        }
    });

    return result;

};

const draw = () => {

    let selectedColumns = getSelectedColumns(),
        // obtem os valors inferidos para as colunas selecionadas
        inferredValues = [dataSet.inferredValues[selectedColumns[0]], dataSet.inferredValues[selectedColumns[1]]];

    let isPossibleToRenderChart = false;

    // descobre se as colunas selecionadas podem gerar o grafico selecionado
    for(let i = 0; i < template.possibleColumns.get().length; i++) {

        if(template.possibleColumns.get()[i][0] == inferredValues[0]
            && template.possibleColumns.get()[i][1] == inferredValues[1]) {

            isPossibleToRenderChart = true;
        }
    }

    if(!isPossibleToRenderChart) {

        addToChat('Columns selected dont have the right type to render the chart! Please change columns.', false, 'warning');

        reset();

        return;
    }

    let values = [];

    // montar dados, desconsidera a primeira linha que eh o header
    for(let i = 1; i < dataSet.rowData.length; i++) {

        let row = dataSet.rowData[i];

        if(row.length < 2) {
            break;
        }

        values.push({
            key: row[selectedColumns[0]],
            value: row[selectedColumns[1]],
        });

    }

    // limpa a area de grafico
    $("#chart").empty();

    let chartConstructor =  Charts[template.chartName.get()];

    // se o grafico selecionado ja foi implementado
    if(chartConstructor) {

        console.log(values)

        // cria o novo grafico
        let chart = new chartConstructor("#chart", values);
    }
    else {

        addToChat('Chart not available yet!', false,  'danger');
    }

    reset();

};