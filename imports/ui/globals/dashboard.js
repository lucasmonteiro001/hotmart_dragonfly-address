/**
 * Created by lucas on 7/31/16.
 */
import './dashboard.html';
import './loading.html';
import {Users} from '../../api/users/users';
import {Pesquisas} from '../../api/pesquisas/pesquisas';

_ = lodash;

let template;

const RECUSADA = 'recusada',
    TIMEOUT_GRAFICO = 1000;

/**
 * Obtém um array com as datas do últimos {n} dias.
 * @param n
 */
const ultimosNDias = (n) => {

    let hoje = moment().format('YYYY/MM/DD'),
        dias = [];

    // insere a data atual para os ultimos 10 dias
    dias.push(hoje);

    // Insere as n - 1 datas anterior a {hoje}
    for(let i = 0; i < n; i++) {
        dias.push(moment().subtract(i + 1, 'days').format('YYYY/MM/DD'))
    }

    // data em ordem crescente
    dias = dias.reverse();

    return dias;
};

/**
 * Gera o gráfico de entrevistas por entrevistadores
 * @param entrevistadores
 */
const graficoEntrevistasPorEntrevistador = (entrevistadores) => {

    if(!google.visualization) return;

    let data = new google.visualization.DataTable();

    data.addColumn('string', 'Nome');
    data.addColumn('number', 'Número de Entrevistas');

    // Cria um array com os dados de nome e numEntrevistas do entrevistador
    entrevistadores = entrevistadores.map((entrevistador) => {
        return [entrevistador.nome, entrevistador.numEntrevistas];
    });

    // Adicona os dados do gráfico
    data.addRows(entrevistadores);

    let options = {
        'width':490,
        'height':240};

    // Instantiate and draw our chart, passing in some options.
    let chart = new google.visualization.PieChart(document.getElementById('chart_div'));

    chart.draw(data, options);
};

/**
 * Gera o gráfico dos últimos 10 dias de entrevistas
 * @param ultimos10dias
 * @param ultimos10diasDados
 */
const graficoUltimos10Dias = (ultimos10dias, ultimos10diasDados) => {

    if(!google.visualization) return;

    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Dia');
    data.addColumn('number', 'Número de Entrevistas');

    let ultimos10diasDadosArray = [];

    for(let i = 0; i < ultimos10dias.length; i++) {
        ultimos10diasDadosArray.push([ultimos10dias[i], ultimos10diasDados[ultimos10dias[i]] || 0]);
    }

    data.addRows(ultimos10diasDadosArray);

    options = {
        'width':490,
        'height':240};

    // Instantiate and draw our chart, passing in some options.
    let chart = new google.visualization.LineChart(document.getElementById('chart_tempo'));


    // chart.draw(data, options);
    chart.draw(data, options);

}

/**
 * Inicializa os gráficos
 * @param template
 * @param entrevistadores
 * @param ultimos10dias
 * @param ultimos10diasDados
 */
const iniciarGraficos = (template, entrevistadores, ultimos10dias, ultimos10diasDados) => {

    setTimeout(() => {
        // Limpa o loading dos gráficos
        template.isGraficoCarregando.set(false);

        // Gera os gráficos no próximo event loop
        setTimeout(() => {
            // Carrega os gráficos
            graficoEntrevistasPorEntrevistador(entrevistadores);
            graficoUltimos10Dias(ultimos10dias, ultimos10diasDados);
        }, 100);


    }, TIMEOUT_GRAFICO);
};

Template.dashboard.onCreated(() => {

    let ultimos10dias = ultimosNDias(10);

    template = Template.instance();

    template.subscribe('Users', {}, {nome: 1});
    template.subscribe('Pesquisas', {status: "aberta"}, {dispositivos: 1, entrevistas: 1, status: 1});

    template.entrevistadores = new ReactiveVar([]);
    template.dadosGrafico = new ReactiveVar();
    template.entrevistasRealizadas = new ReactiveVar(0);
    template.entrevistasRealizadasUltimos10dias = new ReactiveVar(0);
    template.entrevistasRecusadas = new ReactiveVar(0);
    template.isGraficoCarregando = new ReactiveVar(true);

    template.users = () => {
        return Users.find().fetch();
    };
    template.pesquisasAbertas = () => {
        return Pesquisas.find({status: /aberta/i}).fetch();
    };

    template.autorun(() => {

        let pesquisas = Pesquisas.find({status: /aberta/i}).fetch(),
            dados = {},
            entrevistasRealizadas = 0,
            entrevistasRecusadas = 0,
            entrevistasRealizadasUltimos10dias = 0,
            ultimos10diasDados = {},
            entrevistadores = Users.find({"roles": "entrevistador"}).fetch();

        // Atualiza a variável com Entrevistadores
        template.entrevistadores.set(entrevistadores);

        // Percorre todas as pesquisas abertas
        pesquisas.map( pesquisa => {

            let entrevistas = pesquisa.entrevistas;

            // Se a pesquisa possui entrevistas
            if(entrevistas) {

                // Zera o contados de entrevistas dos ultimos 10 dias
                template.entrevistasRealizadasUltimos10dias.set(0);

                // salva as entrevistas realizadas por cada entrevistador
                entrevistas.map(entrevista => {

                    // Incrementa o contador de número de entrevistas realizadas
                    entrevistasRealizadas += 1;

                    if(entrevista.status === RECUSADA) {
                        // Incrementa o contador de número de entrevistas recusadas
                        entrevistasRecusadas += 1;
                    }

                    let entrevistador = entrevista.entrevistador,
                        data = moment(entrevista.dataHora).format('YYYY/MM/DD'); // Data de realização da entrevista

                    // Se a entrevista foi realizada nos últimos 10 dias
                    if(ultimos10dias.includes(data)) {

                        // Atualiza o contador de entrevistas dos últimos 10 dias
                        entrevistasRealizadasUltimos10dias++;

                        // Salva no contador de entrevistas
                        if(ultimos10diasDados[data]) {
                            ultimos10diasDados[data] += 1;
                        }
                        else {
                            ultimos10diasDados[data] = 1;
                        }
                    }

                    // Salva entrevista relacionado ao autor. Utilizada no gráfico de entrevistas por entrevistador
                    if(dados[entrevistador]) {
                        dados[entrevistador] += 1;
                    }
                    else {
                        dados[entrevistador] = 1;
                    }

                });

                // Atualiza o número de entrevistas realizadas e recusadas
                template.entrevistasRealizadas.set(entrevistasRealizadas);
                template.entrevistasRecusadas.set(entrevistasRecusadas);
                template.entrevistasRealizadasUltimos10dias.set(entrevistasRealizadasUltimos10dias);
            }

        });

        // Adiciona para cada entrevistador o número de entrevistas que ele realizou.
        // Esse número foi calculado no método acima
        entrevistadores = entrevistadores.map(entrevistador => {
            entrevistador.numEntrevistas = dados[entrevistador._id] || 0;
            return entrevistador;
        });

        iniciarGraficos(template, entrevistadores, ultimos10dias, ultimos10diasDados);

    });

});

Template.dashboard.helpers({

    'numUsuarios': () => {
        return template.users().length;
    },
    'numPesquisasAbertas': () => {
        return template.pesquisasAbertas().length;
    },
    'numEntrevistasRealizadas': () => {
        return template.entrevistasRealizadas.get();
    },
    'numEntrevistasRecusadas': () => {
        return template.entrevistasRecusadas.get();
    },
    'isGraficoCarregando': () => {
        return template.isGraficoCarregando.get();
    },
    'numEntrevistasRealizadasUltimos10dias': () => {
        return template.entrevistasRealizadasUltimos10dias.get();
    }

});