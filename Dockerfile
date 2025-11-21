# 1. Usamos una imagen base con Java 17
FROM eclipse-temurin:17-jdk-alpine

# 2. Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos el archivo .jar generado (el asterisco * ayuda a no preocuparse por versiones)
COPY target/*.jar app.jar

# 4. Comando para iniciar la app
ENTRYPOINT ["java","-jar","/app.jar"]