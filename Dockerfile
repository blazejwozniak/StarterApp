FROM openjdk:11-jdk-alpine
MAINTAINER bw.com
VOLUME /tmp
EXPOSE 8089
ADD build/libs/StarterApp-0.0.1-SNAPSHOT.jar starter-app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/starter-app.jar"]
