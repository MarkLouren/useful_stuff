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


EMAIL_USE_TLS = True             <== for sending a confirmation email
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'example@gmail.com'
EMAIL_HOST_PASSWORD = 'password'
EMAIL_PORT = 587

```

4) We are going to use UserCreationForm that comes with django, this form is tied to User model that django comes with by default. in **APP account** => create file **forms.py**

```
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
class UserSignUpForm(UserCreationForm):     <==We create a UserSignUpForm class where we pass an instance of UserCreationForm
    email = forms.EmailField(max_length=100, help_text='Required')  <== We create form field called email 
    class Meta:    <== We create a Meta class for our form.
        model = User    <== We define which model that our form is going to use
        fields = ('username', 'email', 'password1', 'password2') <== We define the fields that the user is going to see.

```
5) When a user is created during sign up process, we need to create a unique token so that we can verify the new user when confirming that they control the email used during signup process. Inside our **account folder**, we are going to create a new file called token_generator.py file, make sure that **token_generator.py** file has the following code:

```
# we import django password token generator. This class generate a token without persisting it to the database, yet it’s still able to determine whether the token is valid or not. 
## we import six from django utils. Six provides simple utilities for wrapping over differences between Python 2 and Python 3.
###  we create TokenGenerator class an pass an Instance of PasswordTokenGenerator.
####  we create a method _make_hash_value which overrides PasswordTokenGenerator method
####  we return user id, timestamp and user is active using the six imported from django utils.

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils import six

class TokenGenerator(PasswordResetTokenGenerator):  
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk) + six.text_type(timestamp) + six.text_type(user.is_active)
        )
        
###### we create variable and we equate it to our token generator class
        
account_activation_token = TokenGenerator()

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

