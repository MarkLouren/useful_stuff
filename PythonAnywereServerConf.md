**Open Bash console:**
 1) mkvirtualenv --python=python3.5 myproj - Create VirEnv(VE) with version python3.5 for project: myproj
 2) pip list - check all packaged that already have been installed in this VE
 3) pip install -U django  - install django package to our VE
 4) which django-admin.py - check if django installed
5) git clone https://github.com/MarkLouren/django-deployment-example.git 
6) cd django-deployment-example
7) ls => cd learning_templates
8) python manage.py migrate 
9) python manage.py makemigrations basic_app
10) python manage.py createsuperuser

**Go to Dashboard pannel**
1) Web=>Create a new App =>Manual Configuration (MC) =>to the end
2) in MC=> change the path for VirEnv => /home/MarkLouren/.virtualenvs/myproj 
3) Change path for Source code to /home/MarkLouren/django-deployment-example/learning_templates ( If you don't know the path=>open console, find your home directory: 
```
(myproj) 12:54 ~ $ cd django-deployment-example
(myproj) 12:54 ~/django-deployment-example (master)$ cd learning_templates
(myproj) 12:54 ~/django-deployment-example/learning_templates (master)$ pwd
/home/MarkLouren/django-deployment-example/learning_templates
(myproj) 12:55 ~/django-deployment-example/learning_templates (master)$ 
```
4) **Configure WSGI file:**
```
# +++++++++++ DJANGO +++++++++++
# To use your own django app use code like this:
import os
import sys
#
## assuming your django settings file is at '/home/MarkLouren/mysite/mysite/settings.py'
## and your manage.py is is at '/home/MarkLouren/mysite/manage.py'
path = '/home/MarkLouren/django-deployment-example/learning_templates'
if path not in sys.path:
    sys.path.append(path)

os.chdir(path)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "learning_templates.settings")
import django
django.setup()

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```
5) Back to Dashboard in Files add to seetings.py ALLOWED_HOSTS ['.marklouren.pythonanywhere.com'] 
Click on marklouren.pythonanywhere.com'
8) Create a Directory fot static files: home/MarkLouren/django-deployment-example/learning_templates +Create /static/
7) Fix the URL for static files=> Web tab=> Staticl Files:
URL: /static/admin DIRECTORY: /home/MarkLouren/.virtualenvs/myproj/lib/python3.5/site-packages/django/contrib/admin/static/admin 
URL: /static/      DIRECOTY: /home/MarkLouren/django-deployment-example/learning_templates/static
8) Turn OFF debug mode => Files => learning_templates => learning template settings.py=> DEBUG = False
8) 
