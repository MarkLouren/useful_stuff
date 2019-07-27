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
