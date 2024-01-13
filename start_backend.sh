sudo /opt/lampp/lampp start

cd ./backend

php artisan migrate &
php artisan serve &


# for a new clone
# php composer install
# php artisan storage:link

