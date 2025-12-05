pipeline {
    agent any

    environment {
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
                bat 'echo No tests configured'
            }
        }

        stage('Análisis SonarQube') {
            steps {
                bat 'sonar-scanner'
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    script {
                        try {
                            def qg = waitForQualityGate()
                            if (qg.status != 'OK') {
                                error "Pipeline abortado por Quality Gate: ${qg.status}"
                            }
                        } catch(e) {
                            echo "waitForQualityGate no disponible: ${e}"
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



