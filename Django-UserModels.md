How to Extend the User model.
Option 1:
```
models.py

from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
class Profile(models.Model):
    user= models.OneToOneField(settings.AUTH_USER_MODEL)
    interests =models.CharField(max_length=500, null=True, blank=True)

    def __str__(self):
        return str(self.user.name)


def post_save_user_model_receiver(sender, instance, created, *args, **kwargs):
    if created:
        try:
            Profile.objects.create(user=instance)
        except:
            pass

post_save.connect(post_save_user_model_receiver, sender=settings.AUTH_USER_MODEL)

```
Extending User Model Option 2 (!!!the new fields aren’t auto created when a user is created, use django.db.models.signals import post_save
```
#models.py

from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    department = models.CharField(max_length=100)
    
 #admin.py
 
 from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from my_user_profile_app.models import Employee

# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton
class EmployeeInline(admin.StackedInline):
    model = Employee
    can_delete = False
    verbose_name_plural = 'employee'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (EmployeeInline,)

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
    
```

**Option 3 Change BaseUserManager, AbstractBaseUser (working solution)**

```
########models.py######
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class MyUserManager(BaseUserManager):
   def create_user (self, email, name, interests, password=None):
      if not email:
         raise ValueError('User must have an email address')
      user = self.model(
         email=self.normalize_email(email),
         interests=interests,
         name=name,
      )
      user.set_password(password)
      user.save (using=self._db)
      return user

   def create_superuser(self, email, password, interests, name):
      user=self.create_user(
         email,
         password=password,
         interests=interests,
         name=name,
      )
      
      user.is_admin=True
      user.save(using=self._db)
      return user

class MyUser (AbstractBaseUser):
   email = models.EmailField(
      verbose_name='Email',
      max_length=255,
      unique=True,
   )
   name=models.CharField(max_length=50,)
   interests=models.CharField(max_length=500,blank=True)
   is_active = models.BooleanField(default=True)
   is_admin=models.BooleanField(default=False)

   objects=MyUserManager()

   USERNAME_FIELD = 'email'
   REQUIRED_FIELDS = ['name', 'interests',]



   def __str__(self):
      return self.email

   def has_perm(self, perm, obj=None):
      return True

   def has_module_perms(self, app_label):
      return True

   @property
   def is_staff(self):
      return self.is_admin

########forms.py######

from django import forms
from .models import MyUserManager, MyUser
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField

class UserCreationForm(forms.ModelForm):
    password1=forms.CharField(label='Пароль', widget=forms.PasswordInput)
    password2= forms.CharField(label='Повторите Пароль', widget=forms.PasswordInput)

    class Meta:
        model=MyUser
        fields=('email','name', 'interests')
        labels = {
            'name': 'Ваш ник',
            'email': 'Email',
            'interests':'Ваши интересы',
        }

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 and password2 and password1 !=password2:
            raise forms.ValidationError ('Пароли не совпадают')
        return password2
    def save(self, commit=True):
        user=super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
        return user

class UserChangeForm (forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model =MyUser
        fields= ('email', 'password', 'name', 'interests', 'is_active', 'is_admin')
        def clean_password(self):
            return self.initial['password']

class UserAdmin(BaseUserAdmin):
    form=UserChangeForm
    add_form=UserCreationForm
    list_display = ('email', 'is_admin',)
    list_filter=('is_admin',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'interests')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    add_fieldsets = (
        (None, {
            'classes':('wide',),
            'fields':('email', 'name', 'interests', 'password1', 'password2') }
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


########admin.py######

from django.contrib import admin
from .forms import MyUser, UserAdmin
from django.contrib.auth.models import Group

admin.site.register(MyUser, UserAdmin)
admin.site.unregister(Group)

########settings.py######

AUTH_USER_MODEL = 'accounts.MyUser'

########views.py######

#Sign Up VIEW

class SignUp(generic.CreateView):
    form_class= UserCreationForm  #create User Form and pass it to signup.html
    success_url = reverse_lazy('account')
    template_name = 'signup.html'
    # in order to authomatically sign in after signup form
    def form_valid(self, form):
        view = super(SignUp, self).form_valid(form)
        name, email, password, password2 = form.cleaned_data.get('name'), form.cleaned_data.get('email'), form.cleaned_data.get('password1'), form.cleaned_data.get('password2'),
        if password != password2:
            raise forms.ValidationError(
                "password and confirm_password does not match"
            )
        user = authenticate(username=email, password=password)
        login(self.request, user)
        return view

```


Login Function View:
```
views.py

from django.contrib.auth import authenticate, login

def my_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        ...
    else:
        # Return an 'invalid login' error message.
        ...

```

