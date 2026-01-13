pipeline {
  agent any
  stages {
    stage('clonar repositorio') {
      steps {
        git branch: 'main', url: 'https://github.com/MrGoddar/teste-api-ebac.git'
      }
    }
    stage('Instalar dependencias')
    {
      steps {
        bat 'npm install'
      }
    }
    stage('Executar testes API') {
      steps {
        bat 'npm run cy:run'
      }
    }
  }
}
