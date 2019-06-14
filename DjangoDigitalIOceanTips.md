## Tutorials ##
https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04

## UsefulLinks ##

## DataBase ##

## Gunicorn: ##
Launch: gunicorn --bind 0.0.0.0:8000 tribes.wsgi
Test: Command: gunicorn --log-file=- subby.wsgi:application

sudo systemctl restart gunicorn -resart gunicorn after update of the site

Problem: don't display static files in Gunicorn, how to fix: 
```pip install dj-static
Configure your static assets in settings.py:
STATIC_ROOT = 'staticfiles'
STATIC_URL = '/static/'
Add to Your urls.py

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
''''''
urlpatterns += staticfiles_urlpatterns()
```
## Venv ##
activate/deactivate

## Nginx ##
```
sudo nano /etc/nginx/sites-available/myproject  -Edit DOC
sudo ln -s /etc/nginx/sites-available/myproject /etc/nginx/sites-enabled - Enable NGinx
sudo nginx -t - Check Errors
sudo systemctl restart nginx - Restart
sudo nginx -t && sudo systemctl restart nginx  -other option

 /var/log/nginx/nginx_error.log  Error log
```
## Server##
sudo apt-get update - сheck updates for server
sudo apt-get upgrade - apply updates

