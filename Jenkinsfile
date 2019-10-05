pipeline {
  agent any
  environment {
      registry = "ffurlanetto"
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
  }
}