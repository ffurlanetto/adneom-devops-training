FROM nginx:alpine

LABEL maintainer="Florian Furlanetto <florian.furlanetto@gmail.com>"

# Copy required files
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY dist/* /usr/share/nginx/html/
