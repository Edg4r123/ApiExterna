
## Aplicacion de api Externa

La primer fase de la aplicación "el calendario" se encuentra embebida en el framework laravel usando un Usuario para registrarse, ingresar y asociar los eventos de un calendario, también se implemento como webservice pero agregando un basic auth

La segunda fase de la aplicación "api externa" se encuentra del lado del frontend en vue en una webapp independiente de laravel sin embargo el backend que se conecta al api externa esta en laravel y se comporta como una segunda api

Para inicializar el proyecto es necesario lo siguiente

- composer install
- Configurar el .env con una base de datos en mysql, usuario y contraseña
- Es necesario colocar el proyecto en /var/www/ o de lo contrario cambiar la variable de entorno DB_DATABASE_LITE con el path correspondiente a la ubicacion del proyecto
- php artisan migrate 
- php artisan serve --port=8888
- cd appvue/ && php -S localhost:9999
- sudo chmod 777 -R storage/

En el localhost:8888 se encuentra la fase 1
El el localhost:9999 se encuentra la fase 2
