FROM openjdk:11-stretch

LABEL maintainer="Florian Furlanetto <florian.furlanetto@gmail.com>"

# Secure the image by changing the user
RUN groupadd -r asgard -g 1000 && useradd -u 1000 -r -g asgard -m -d /asgard -s /sbin/nologin -c "Asgard" asgard \
    && chmod 755 /asgard

# Set the working directory to planningforce' user home directory
WORKDIR /asgard

# Copy required files
COPY build/libs/asgard-rest.jar /asgard/asgard-rest.jar

# Configure container volumes
VOLUME /asgard

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/asgard/asgard-rest.jar"]