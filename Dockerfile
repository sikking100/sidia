# Gunakan image PHP dengan ekstensi yang dibutuhkan
FROM php:8.2-fpm

# Install ekstensi PHP yang dibutuhkan Laravel
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-install pdo pdo_mysql zip gd bcmath pcntl

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy semua file
COPY . .

# Install dependencies Laravel
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Set permission agar storage & bootstrap bisa di-write
RUN chmod -R 777 storage bootstrap/cache

# Jalankan PHP-FPM
CMD ["php-fpm"]