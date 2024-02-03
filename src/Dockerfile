FROM alpine:latest
LABEL author="Levent Soykan"

RUN apk add --no-cache apache2-ssl
RUN rm -rf /var/www/localhost/cgi-bin/

CMD ["/bin/sh", "-c", "exec /usr/sbin/httpd -D FOREGROUND -f /etc/apache2/httpd.conf"]