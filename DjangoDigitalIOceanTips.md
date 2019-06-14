## Tutorials ##
https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04

## UsefulLinks ##

## DataBase ##

## Gunicorn: ##
Launch: gunicorn --bind 0.0.0.0:8000 tribes.wsgi
Test: Command: gunicorn --log-file=- subby.wsgi:application

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
