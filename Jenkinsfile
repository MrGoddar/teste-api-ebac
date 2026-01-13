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
        sh 'npm install'
      }
    }
    stage('Executar testes API') {
      steps {
        sh 'npm run cy:run'
      }
    }
  }
}
