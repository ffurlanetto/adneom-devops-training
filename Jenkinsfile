pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                docker { image 'openjdk:11-stretch' }
            }
            steps {
                sh './gradlew clean build'
            }
        }
        stage('Docker') {
            agent {
                docker { image 'openjdk:11-stretch' }
            }
            steps {
                sh
            }
        }
        stage('Deploy') {
        }
    }
}