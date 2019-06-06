Open Bash console:
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
