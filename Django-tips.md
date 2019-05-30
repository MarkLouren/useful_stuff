
**Commands:**
- django-admin startproject first project  - launch django (create new folder with basic structure of Django) 
- (create new folder) cd first_project => python manage.py startapp first app
- python manage.py runserver



**urls.py**
```
from django.urls import path
from first_app import views
urlpatterns = [
    path('', views.index, name='index'),
]
```
