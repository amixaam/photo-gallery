#!/bin/bash

# xampp_dir="/opt/lampp" 

# Start Apache server
# "$xampp_dir/apache/bin/apachectl" start

# Start MySQL server
# "$xampp_dir/mysql/bin/mysqld_safe" &

# Print success message
# echo "XAMPP web and MySQL servers started successfully!"

bun run dev &
php artisan serve &