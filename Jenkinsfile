pipeline {
    agent any
    
    environment {
        // Isso adiciona a pasta do WMIC ao PATH para o Node.js encontrar
        PATH = "C:\\Windows\\System32\\wbem;${env.PATH}"
    }

    stages {
        stage('clonar repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/MrGoddar/teste-api-ebac.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
                bat 'npm install'
            }
        }
        stage('Executar testes API') {
            steps {
                // Agora o ambiente terá acesso ao wmic.exe
                bat 'npm run ci:test'
            }
        }
    }
}
