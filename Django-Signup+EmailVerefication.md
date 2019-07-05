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
6) Change views.py in accounts directory 

```
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from .forms import UserSignUpForm
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .token_generator import account_activation_token
from django.contrib.auth.models import User
from django.core.mail import EmailMessage

def usersignup(request):                      <==Create sign up method
    if request.method == 'POST':
        form = UserSignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            current_site = get_current_site(request)        <==we get the current site from the request
            email_subject = 'Activate Your Account'
            message = render_to_string('activate_account.html', {       <==html template for Email
                'user': user,                                                 <== we pass the content to our template
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            })
            to_email = form.cleaned_data.get('email')                    <== we get the user email from our form
            email = EmailMessage(email_subject, message, to=[to_email])     <== we create email instance and pass subject, etc
            email.send()
            return HttpResponse('We have sent you an email, please confirm your email address to complete registration')
    else:
        form = UserSignUpForm()
    return render(request, 'signup.html', {'form': form})    <==  if the request was not a post, we return the form user to fill
    
def activate_account(request, uidb64, token):
    try:
        uid = force_bytes(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)
        return HttpResponse('Your account has been activate successfully')
    else:
        return HttpResponse('Activation link is invalid!')

```

7) Change urls.py in the accounts app

```
from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.usersignup, name='register_user'),
    path('activate/<slug:uidb64>/<slug:token>/',
        views.activate_account, name='activate'),

]

```
8) Change urls.py in the main app

```
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('accounts.urls')),
    path('admin/', admin.site.urls),
]
```
