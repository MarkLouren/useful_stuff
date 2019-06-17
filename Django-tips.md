
**Commands:**
- django-admin startproject first project  - launch django (create new folder with basic structure of Django) 
- (create new folder) cd first_project => python manage.py startapp first_app
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
- python manage.py createsuperuser - create a super user for admin page

**urls.py**
```
from django.urls import path
from first_app import views
urlpatterns = [
    path('', views.index, name='index'),
]
```

- Passwords
pip install bcrypt

- Images:
pip install pillow

pip freeze - Output installed packages in requirements format. ==> pip freeze >requirements.txt so on tne SERVER, we can TYPE:
pip install -r requirements.txt - and dowload all packages on the server that we have on our local machine


pip install django-debug-tool

