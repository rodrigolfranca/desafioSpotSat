FROM postgres:latest

RUN apt-get update && \
    apt-get install -y postgis

ENV POSTGRES_DB SpotSat_Challenge
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD 123

COPY init.sql /docker-entrypoint-initdb.d/
