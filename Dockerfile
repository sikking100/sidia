FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    supervisor git unzip libpq-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-install pdo pdo_mysql zip gd bcmath pcntl \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p etc/supervisor/conf.d

COPY ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]