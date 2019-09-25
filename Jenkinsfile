pipeline {
  agent any
  environment {
      registry = "ffurlanetto"
      registryCredential = 'dockerhub'
    }
  stages {
    stage('Build') {
      tools {
        jdk 'JDK11'
        }
      steps {
        sh './gradlew build'
        stash(allowEmpty: true, name: 'post-build')
      }
    }
    
    
  }
}