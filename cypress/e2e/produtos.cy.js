describe('Testes da Funcionalidade Produtos', () => {
    let token

    before(() => {
        // Realiza o login uma vez para obter o token de autenticação
        cy.request({
            method: 'POST',
            url: 'login',
            body: {
                "email": "fulano@qa.com",
                "password": "teste"
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            token = response.body.authorization
        })
    })

    it('Deve listar os produtos cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
        })
    })

    it('Deve cadastrar um produto com sucesso', () => {
        // Nome dinâmico para evitar o erro 400 (Já existe produto com esse nome)
        let nomeProduto = `Produto EBAC ${Math.floor(Math.random() * 1000000)}`
        
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: { authorization: token },
            body: {
                "nome": nomeProduto,
                "preco": 100,
                "descricao": "Produto cadastrado via Pipeline",
                "quantidade": 100
            }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    })

    it('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
        // Este teste propositalmente tenta repetir um nome para validar o erro 400
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: { authorization: token },
            body: {
                "nome": "Logitech MX Vertical", // Produto que já costuma existir no Serverest
                "preco": 100,
                "descricao": "Mouse",
                "quantidade": 100
            },
            failOnStatusCode: false // Permite que o teste continue para validar o erro
        }).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Já existe produto com esse nome')
        })
    })

    it('Deve editar um produto já cadastrado', () => {
        let nomeEditado = `Produto Editado ${Math.floor(Math.random() * 1000000)}`
        
        // Primeiro buscamos um produto para ter um ID válido
        cy.request('produtos').then(response => {
            let id = response.body.produtos[0]._id
            
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: { authorization: token },
                body: {
                    "nome": nomeEditado,
                    "preco": 200,
                    "descricao": "Produto editado via teste",
                    "quantidade": 50
                }
            }).then(response => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })
    })

    it('Deve excluir um produto cadastrado', () => {
        // Cadastramos um produto novo para garantir que temos um ID que pode ser deletado
        let nomeParaDeletar = `Produto para Deletar ${Math.floor(Math.random() * 1000000)}`
        
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: { authorization: token },
            body: {
                "nome": nomeParaDeletar,
                "preco": 10,
                "descricao": "Delete",
                "quantidade": 1
            }
        }).then(response => {
            let id = response.body._id
            
            cy.request({
                method: 'DELETE',
                url: `produtos/${id}`,
                headers: { authorization: token }
            }).then(response => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Registro excluído com sucesso')
            })
        })
    })
})
