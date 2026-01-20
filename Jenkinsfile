pipeline {
    agent any

    stages {
        stage('Ambiente e Dependências') {
            steps {
                // Passo básico de instalação solicitado pelo tutor
                bat 'npm install'
            }
        }

        stage('Execução de Testes e Relatórios') {
            steps {
                // Utiliza os scripts definidos no package.json conforme sugerido
                // catchError garante que a pipeline continue para gerar o relatório mesmo se um teste falhar
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat 'npm run cy:run'
                }
                
                // Consolida os resultados em um relatório HTML único
                bat 'npm run report:merge'
                bat 'npm run report:gen'
            }
        }
    }

    post {
        always {
            // Arquiva o relatório final para visualização no Jenkins
            archiveArtifacts artifacts: 'cypress/reports/html/**', fingerprint: true
        }
    }
}
