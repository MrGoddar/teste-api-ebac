// /cypress/support/gerador.js

export function gerarUsuario() {
    return {
        nome: "Usuario Teste " + Math.random().toString(36).substring(2, 7), // Nome aleatório
        email: "teste_" + Math.floor(Math.random() * 100000) + "@qa.com.br",
        password: "teste",
        administrador: "true"
    };
}