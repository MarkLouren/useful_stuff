*Custom form validation, ex:*
```
from django import forms
from django.core import validators

#custom validation
def check_for_z(value):
    if value[0].lower() != 'z':
        raise forms.ValidationError ("NAME WITH Z")

class FormName(forms.Form):
    name = forms.CharField(validators=[check_for_z])
    email = forms.EmailField()
    text = forms.CharField(widget=forms.Textarea)
    botcatcher = forms.CharField(required=False,
                                 widget=forms.HiddenInput,
                                 validators=[validators.MaxLengthValidator(0)])
```
