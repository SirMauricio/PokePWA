pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'SonarQube' 
        VERCEL_TOKEN = credentials('vercel-token')
    }

    stages {
        stage('Instalar dependencias') {
            steps {
                bat 'npm install'
            }
        }

        stage('Ejecutar tests unitarios') {
            steps {
                bat 'npm test'
            }
        }

        stage('Análisis SonarQube') {
            steps {
                withSonarQubeEnv(SONARQUBE_SERVER) {
                    bat 'npm run sonar'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    script {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline abortado por Quality Gate: ${qg.status}"
                        }
                    }
                }
            }
        }

        stage('Despliegue a producción') {
            when {
                branch 'main'
            }
            steps {
                bat "npx vercel --prod --token=${VERCEL_TOKEN}"
            }
        }
    }

    post {
        failure {
            echo 'El pipeline falló :('
        }
        success {
            echo 'Pipeline completado exitosamente :)'
        }
    }
}



