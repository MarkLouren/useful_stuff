
**Commands:**
- django-admin startproject first project  - launch django (create new folder with basic structure of Django) 
- (create new folder) cd first_project => python manage.py startapp first app
- python manage.py runserver
- python manage.py makemigrations first_app - make migrations from models to database =>
- python manage.py migrate
- python manage.py shell - check in shell how to work database
Ex:
```
>>> from first_app.models import Topic
>>> print (Topic.objects.all())
<QuerySet []>
>>> t = Topic(top_name="Social Network")
>>> t.save()
>>> print(Topic.objects.all())
<QuerySet [<Topic: Social Network>]>
>>> 
```


**urls.py**
```
from django.urls import path
from first_app import views
urlpatterns = [
    path('', views.index, name='index'),
]
```
