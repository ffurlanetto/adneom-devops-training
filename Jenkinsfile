pipeline {
  agent none
  environment {
      registry = "ffurlanetto"
      registryCredential = 'dockerhub'
    }
  stages {
    stage('Build') {
      agent {
        label 'openjdk-11'
      }
      steps {
        sh './gradlew build'
        stash(allowEmpty: true, name: 'post-build')
      }
    }
    stage('Docker') {
      agent {
        label 'docker'
      }
      steps {
        unstash 'post-build'
        dir(path: 'asgard-rest') {
            script {
                docker.build(registry + "/asgard-rest:latest")
            }
        }

        dir(path: 'asgard-web') {
            script {
                docker.build(registry + "/asgard-web:latest")
            }
        }
      }
    }
    stage('Deploy') {
      agent {
        label 'docker-slave'
      }
      steps {
        script {
          sh "docker-compose up -d"
          echo 'Open you browser to http://localhost:5580/'
        }
      }
    }
  }
}