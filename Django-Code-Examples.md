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

*List of objects + Is user.is_authenticated*
```
def post_model_list_view(request)

   qa=PostModel.objects.all()         
   context_dictionary ={
   "object_list":qs,
   "some_dict": {"abc": 123},
   "num":123,
   }
   if request.user.is_authenticated():          ===> Check if user is authenticated
     template= "blog/list-view.html"
   else: 
     template = "blog/list-view-public.html"
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
```
*Customization Forms in HTML Template*

```
{% extends "halls/base.html" %}

{% block content %}
<div class="container">
   <h2>Add Video</h2>
    <form method="POST">
        {% csrf_token %}
        {% for field in form %}
        <p>
        {{ field.errors }}
        {{field }}
            {{field.label_tag }}

            </p>

        {% endfor %}


        <button type="submit" class="btn btn-primary">Create</button>
    </form>
</div>

{%  endblock %}
```
*FORMSET*
```
in VIEWS:
from django.forms import formset_factory
def add_video(request, pk):  #Pk of the hall
    VideoFormSet=formset_factory(VideoForm, extra=5) #connect form from forms,dublicate 5 times
    form = VideoFormSet()
    search_form = SearchForm()
    if request.method == "POST":
        #Create
        filled_form=VideoFormSet(request.POST) #get all post date in video form and vaidate it

        if filled_form.is_valid():
            video=Video()
            video.url=filled_form.cleaned_data['url']
            video.title = filled_form.cleaned_data['title']
            video.youtube_id = filled_form.cleaned_data['youtube_id']
            video.hall= Hall.objects.get(pk=pk) #was passed in function
            video.save() #save to database
in TEMPALTE:
 {{ formset.management_form }}
        {% for aform in form %}
        {% endfor%}



```
