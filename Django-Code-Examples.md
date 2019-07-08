CRUD: Create, Retrive, Update, Delete, List

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

*List of objects*
```
def post_model_list_view(request)
   qa=PostModel.objects.all()
   print(qs)
   template_path ="list-view.html"
   context_dictionary ={
   "object_list":qs,
   "some_dict": {"abc": 123},
   "num":123,
   
   }
   return render (request, template_path, context_dictionary)
   
   IN LIST-VIEW.html
   <h1>hello World </h1>
   {{ object_list }}               => or:
   
  {% for object in object_list %}
  <li>{{ object.title }}{{ object.slug }}</li>
  {% endfor %}
  
  
```
*Get All Class Atributes*
```
print (dir(request)) ==> all available properties
``
