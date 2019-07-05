1)
**Commands:**
- django-admin startproject first project  - launch django (create new folder with basic structure of Django) 
- (create new folder) cd first_project => python manage.py startapp first_app

Create a structure of the future project 

- python manage.py runserver
- python manage.py makemigrations first_app - make migrations from models to database =>
- python manage.py migrate
- python manage.py shell - check in shell how to work database


2) Create directories templates (for html templates and static for static files)
3) add correct paths to settings.py
```
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   
TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')                     < ===  add templates directories


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'bootstrap4',                         < === add own apps here
    'accounts.apps.AccountsConfig',         < === add own apps here
    'groups.apps.GroupsConfig',
    'posts.apps.PostsConfig',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATE_DIR],                             < === change this
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

 Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {           <=== change the default database
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'portfoliodb',
        'USER': '______',
        'PASSWORD': '________',
        'HOST': 'localhost',
        'PORT': '',

    }
}




STATIC_URL = '/static/'                               <== for static files 
STATICFILES_DIRS =[os.path.join(BASE_DIR, 'static')]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')       <== for media files that added by users

try:                                 <== import local settings for 
    from .local_settings import *
except ImportError:
    pass



```

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

