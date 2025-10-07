
/// <reference types="cypress" />


describe('Testes da Funcionalidade Usuários', () => {

it('Deve validar contrato de usuários', () => {

cy.request({

method: 'GET',

url: 'http://localhost:3000/usuarios',

}).then((response) => {

expect(response.status).to.eq(200);



expect(response.body.usuarios).to.be.an('array');

const primeiroUsuario = response.body.usuarios[0];

expect(primeiroUsuario).to.have.all.keys(

'nome',

'email',

'password',

'administrador',

'_id'

);



expect(primeiroUsuario.nome).to.be.a('string');

expect(primeiroUsuario.administrador).to.be.a('string'); 

});

});

  it('Deve listar usuários cadastrados', () => {
cy.request({
    method: 'GET',
    url: 'http://localhost:3000/usuarios',
}).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.usuarios).to.have.length.of.at.least(1);
});

  });

it('Deve cadastrar um usuario com sucesso', () => {
    
    const novoUsuario = {
        nome: "Fulano da Silva",
        email: "fulano_qa_" + Math.floor(Math.random() * 100000) + "@qa.com.br", 
        password: "teste",
        administrador: "true"
    };

 
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/usuarios', 
        body: novoUsuario, 
        failOnStatusCode: false 
    }).then((response) => {
        
        expect(response.status).to.eq(201);

        expect(response.body.message).to.eq("Cadastro realizado com sucesso");

        expect(response.body).to.have.property('_id');

        cy.wrap(response.body._id).as('novoUsuarioId');
    });
});

it('Deve validar um usuário com email inválido', () => {
    const usuarioInvalido = {
        nome: "Usuario Teste Invalido",
        email: "email.invalido.com", 
        password: "teste",
        administrador: "true"
    };

    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/usuarios', 
        body: usuarioInvalido,
        failOnStatusCode: false 
    }).then((response) => {
        
        expect(response.status).to.eq(400); 

        expect(response.body.email).to.eq("email deve ser um email válido");
        

        expect(response.body).to.not.have.property('_id');
    });
});

it('Deve editar um usuário previamente cadastrado', () => {
    let userId;
    
    const usuarioParaEditar = {
        nome: "Matheus",
        email: "matheus_" + Math.floor(Math.random() * 100000) + "@qa.com.br",
        password: "teste",
        administrador: "true"
    };

    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/usuarios',
        body: usuarioParaEditar
    }).then((postResponse) => {

      userId = postResponse.body._id;

        const usuarioEditado = {
            nome: "Nome Editado com Sucesso",
            email: "editado_" + Math.floor(Math.random() * 100000) + "@qa.com.br",
            password: "nova_senha",
            administrador: "false" 
        };

        cy.request({
            method: 'PUT',
            url: `http://localhost:3000/usuarios/${userId}`, 
            body: usuarioEditado,
        }).then((putResponse) => {

            expect(putResponse.status).to.eq(200);

            expect(putResponse.body.message).to.eq("Registro alterado com sucesso");
            
        });
    });
});

it('Deve deletar um usuário previamente cadastrado', () => {
    let userId;

    const usuarioParaDeletar = {
        nome: "Usuario para Deletar",
        email: "deletar_" + Math.floor(Math.random() * 100000) + "@qa.com.br",
        password: "teste",
        administrador: "false"
    };

    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/usuarios',
        body: usuarioParaDeletar
    }).then((postResponse) => {
        userId = postResponse.body._id;

        
      
        cy.request({
            method: 'DELETE',
            url: `http://localhost:3000/usuarios/${userId}`, 
        }).then((deleteResponse) => {

            expect(deleteResponse.status).to.eq(200); 

            expect(deleteResponse.body.message).to.eq("Registro excluído com sucesso");
            

            cy.request({
                method: 'GET',
                url: `http://localhost:3000/usuarios/${userId}`,
                failOnStatusCode: false 
            }).then((getDeletedResponse) => {
                expect(getDeletedResponse.status).to.eq(400);
            });
        });
    });
});


});
