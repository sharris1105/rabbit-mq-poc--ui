ARG ASPNETCORE_ENVIRONMENT=Development
ARG APP_VERSION=1.0

###
# Build
FROM hub.pvops.com/prod/node-angular:node12.6_chrome76_firefoxesr as build
WORKDIR /src

COPY package.json /src/package.json
RUN npm install

COPY . .

RUN ng test --watch=false
# RUN ng e2e --port 4202

RUN ng build --prod --output-path=/app
COPY run.sh /app

###
# release
FROM nginx:1.17-alpine

ARG ASPNETCORE_ENVIRONMENT
ENV ASPNETCORE_ENVIRONMENT "${ASPNETCORE_ENVIRONMENT}"
ENV ASPNETCORE_URLS="http://0.0.0.0:80"

MAINTAINER pv
WORKDIR /app
WORKDIR /usr/share/nginx/html

COPY --from=build /app/run.sh /app/run.sh
COPY --from=build /app .

ARG APP_VERSION
RUN echo $APP_VERSION > version.txt

#USER 1000:1000
EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
CMD ["/app/run.sh"]
