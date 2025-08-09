/// <reference types="cypress" />



describe('Testes da Funcionalidade Usuários', () => {



it('Deve validar contrato de usuários', () => {

cy.request('GET', '/usuarios').then(response => {

// Valida o status da resposta

expect(response.status).to.eq(200);



// Valida a estrutura básica do corpo da resposta

expect(response.body).to.have.property('quantidade');

expect(response.body).to.have.property('usuarios');

expect(response.body.usuarios).to.be.an('array');



// Se houver usuários, valida a estrutura do primeiro item do array

if (response.body.usuarios.length > 0) {

const primeiroUsuario = response.body.usuarios[0];

expect(primeiroUsuario).to.have.all.keys(['nome', 'email', 'password', 'administrador', '_id']);

expect(primeiroUsuario.nome).to.be.a('string');

expect(primeiroUsuario.email).to.be.a('string');

expect(primeiroUsuario.administrador).to.be.a('string');

}

});

});



it('Deve listar usuários cadastrados', () => {

cy.request('GET', '/usuarios').then(response => {

// Garante que o status da requisição é 200

expect(response.status).to.eq(200);


// Garante que o corpo da resposta contém a lista de usuários e a quantidade

expect(response.body.usuarios).to.be.an('array');

expect(response.body.quantidade).to.be.at.least(0);

});

});



it('Deve cadastrar um usuário com sucesso', () => {

const usuario = {

nome: `Usuario Teste ${Date.now()}`,

email: `usuario_${Date.now()}@test.com`,

password: 'testepassword',

administrador: 'true'

};



cy.request('POST', '/usuarios', usuario).then(response => {

// Valida se o cadastro foi realizado com sucesso

expect(response.status).to.eq(201);

expect(response.body.message).to.eq('Cadastro realizado com sucesso');

expect(response.body).to.have.property('_id');

});

});



it('Deve validar um usuário com email inválido', () => {

const usuarioEmailInvalido = {

nome: `Usuario Invalido ${Date.now()}`,

email: `email_invalido`,

password: 'testepassword',

administrador: 'true'

};



cy.request({

method: 'POST',

url: '/usuarios',

body: usuarioEmailInvalido,

failOnStatusCode: false

}).then(response => {

// Valida o status e a mensagem de erro para o email inválido

expect(response.status).to.eq(400);

expect(response.body.email).to.eq('email deve ser um email válido');

});

});



it('Deve editar um usuário previamente cadastrado', () => {

const novoUsuario = {

nome: `Usuario Para Editar ${Date.now()}`,

email: `editar_${Date.now()}@test.com`,

password: 'oldpassword',

administrador: 'true'

};



const dadosEditados = {

nome: `Usuario Editado ${Date.now()}`,

email: `editado_${Date.now()}@test.com`,

password: 'newpassword',

administrador: 'false'

};


// 1. Cadastra um novo usuário para ser editado

cy.request('POST', '/usuarios', novoUsuario).then(responseCriacao => {

const idUsuario = responseCriacao.body._id;


// 2. Edita o usuário recém-criado usando o ID retornado

cy.request('PUT', `/usuarios/${idUsuario}`, dadosEditados).then(responseEdicao => {

expect(responseEdicao.status).to.eq(200);

expect(responseEdicao.body.message).to.eq('Registro alterado com sucesso');


});

});

});



it('Deve deletar um usuário previamente cadastrado', () => {

const usuarioParaDeletar = {

nome: `Usuario Para Deletar ${Date.now()}`,

email: `deletar_${Date.now()}@test.com`,

password: 'deletablepassword',

administrador: 'false'

};



// 1. Cadastra um novo usuário para ser deletado

cy.request('POST', '/usuarios', usuarioParaDeletar).then(responseCriacao => {

const idUsuario = responseCriacao.body._id;



// 2. Deleta o usuário recém-criado usando o ID retornado

cy.request('DELETE', `/usuarios/${idUsuario}`).then(responseDelecao => {

expect(responseDelecao.status).to.eq(200);

expect(responseDelecao.body.message).to.eq('Registro excluído com sucesso');

});

});

});

});