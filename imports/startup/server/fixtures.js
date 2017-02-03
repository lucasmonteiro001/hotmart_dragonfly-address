import { Terms } from '../../api/terms/terms';

const admin = {
    email: 'monografia@dcc.ufmg.br',
    password: 'monografia',
    nome: 'nome do administrador',
    roles: ['administrador']
};

console.log("Iniciando o arquivo fixtures.js");

// cria usuario se nao existe nenhum
if(Meteor.users.find().count() === 0) {

    console.log("Nenhum usuario localizando no banco.\n Criando usuarios iniciais...");

    let userId = Accounts.createUser({ email:admin.email, password:admin.password });
    Roles.addUsersToRoles(userId, admin.roles);
    console.log("Usuario <", admin.email, "> com senha <", admin.password,
        "> foi criado com o papel de <", admin.roles[0], ">");
}

if(Terms.find().fetch().length === 0) {

    let terms = [{"term":"Associate","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Categorize","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Cluster","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Compare","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Correlate","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Deviation","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Distinguish","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Distribution","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Gaps","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Identify","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Locate","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Part to Whole","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Rank","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Re-expressing","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Time Series","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Trend","group":"Analytical Tasks","type":"Data Analysis"},{"term":"Annotate","group":"Analytical Tasks","type":"User Interaction"},{"term":"Bookmark","group":"Analytical Tasks","type":"User Interaction"},{"term":"Brushing and linking","group":"Analytical Tasks","type":"User Interaction"},{"term":"Details on Demand","group":"Analytical Tasks","type":"User Interaction"},{"term":"Extract","group":"Analytical Tasks","type":"User Interaction"},{"term":"Filter","group":"Analytical Tasks","type":"User Interaction"},{"term":"History","group":"Analytical Tasks","type":"User Interaction"},{"term":"Overview","group":"Analytical Tasks","type":"User Interaction"},{"term":"Re-visualizing","group":"Analytical Tasks","type":"User Interaction"},{"term":"Relate","group":"Analytical Tasks","type":"User Interaction"},{"term":"Zoom","group":"Analytical Tasks","type":"User Interaction"}];

    for(let i = 0; i < terms.length; i++) {

        (function (i) {
            Terms.insert(terms[i]);
        })(i);


    }


}