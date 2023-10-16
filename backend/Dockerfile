FROM maven:3.9.3-eclipse-temurin-17 AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package


FROM eclipse-temurin
COPY --from=build /home/app/target/mindasengine-alfa.jar /usr/local/lib/mindasengine.jar
EXPOSE 1337
ENTRYPOINT ["java","-jar","/usr/local/lib/mindasengine.jar"]