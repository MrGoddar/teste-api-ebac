pipeline {
    agent any
    stages {
        stage('clonar repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/MrGoddar/teste-api-ebac.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
                // Remove a pasta antiga para evitar conflitos de módulos corrompidos no Windows
                bat 'if exist node_modules rd /s /q node_modules'
                bat 'npm install'
            }
        }
        stage('Executar testes API') {
            steps {
                // Inicia o servidor em background e aguarda a porta 3000
                bat 'npm run ci:test'
            }
        }
    }
}
