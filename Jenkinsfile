pipeline {
  agent any
  environment {
      registry = "ffurlanetto"
      registryCredential = 'dockerhub'
    }
  stages {
    stage('Build') {
      agent {
        docker {
          alwaysPull true
          args '-e HOME=/tmp'
          image 'openjdk:11-stretch'
        }

      }
      steps {
        sh './gradlew build'
        stash(allowEmpty: true, name: 'post-build')
      }
    }
    stage('Docker') {
      steps {
        unstash 'post-build'
        dir(path: 'asgard-rest') {
            script {
                docker.withRegistry('', registryCredential) {
                    def asgardRestImage = docker.build(registry + "/asgard-rest:latest")
                    asgardRestImage.push()
                }
            }
            sh "docker rmi $registry/asgard-rest:latest"
        }

        dir(path: 'asgard-web') {
            script {
                docker.withRegistry('', registryCredential) {
                    def asgardWebImage = docker.build(registry + "/asgard-web:latest")
                    asgardWebImage.push()
                }
            }
            sh "docker rmi $registry/asgard-web:latest"
        }
      }
    }
    stage('Deploy') {
        when {
          branch 'master'
        }
      steps {
        step([$class: 'DockerComposeBuilder', dockerComposeFile: 'docker-compose.yml', option: [$class: 'StartAllServices'], useCustomDockerComposeFile: false])
      }
    }
  }
}