
**Commands:**
- django-admin startproject first project  - launch django (create new folder with basic structure of Django) 



**urls.py**
```
from django.urls import path
from first_app import views
urlpatterns = [
    path('', views.index, name='index'),
]
```
