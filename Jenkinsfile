pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'SonarQube' 
        VERCEL_TOKEN = credentials('vercel-token')
    }

    stages {
        stage('Instalar dependencias') {
            steps {
                script {
                
                    sh 'npm install'
                }
            }
        }

        stage('Ejecutar tests unitarios') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Análisis SonarQube') {
            steps {
                script {
                    withSonarQubeEnv(SONARQUBE_SERVER) {
                        sh 'npm run sonar'
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    timeout(time: 5, unit: 'MINUTES') {
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
                script {
                    sh "npx vercel --prod --token=${VERCEL_TOKEN}"
                }
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



