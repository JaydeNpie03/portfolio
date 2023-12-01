from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.utils.safestring import mark_safe
from django.urls import reverse
from django import forms

from . import util
from random import choice

class NewPageForm(forms.Form):

    page_title = forms.CharField(label="Page Title", widget=forms.TextInput(attrs={'placeholder':'What is the wiki page for?'}))
    markdown = forms.CharField(label="Contents", widget=forms.Textarea(attrs={'placeholder':'', 'style': "width:100%;"}))

class EditPageForm(forms.Form):

    markdown = forms.CharField(label="Contents", widget=forms.Textarea(attrs={'placeholder':'Enter the Markdown data for the page.', 'style': "width:100%;"}))
        

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def render_entry(request, title):
    return render(request, "encyclopedia/entry.html", {
        "title": title,
        "info": util.get_entry(title)
    })

def search(request):

    if request.method == 'POST':

        if info := util.get_entry(request.POST["q"]):   #If query directly matches a wiki page:
            return HttpResponseRedirect(reverse('wiki:render_entry', kwargs={'title': request.POST["q"]}))  #Redirects to the wiki page
        
        else:
            entries = [e for e in util.list_entries() if request.POST["q"].lower() in e.lower()]    #Contains any entry that contains the query as a substring
            if len(entries) < 1:
                entries.append("No results found.")

            return render(request, "encyclopedia/search.html", {
            "substring": request.POST["q"],
            "entries": entries
            })
        
def new(request):
 
    if request.method == 'POST':
        try:
            util.new_entry(request.POST["page_title"], request.POST["markdown"])
        except ValueError:
            form = NewPageForm(request.POST)
            form.add_error(None, f"An entry already exists for \"{request.POST['page_title']}.\"\n" +
                           "Please enter a different title for your page!")
            return render(request, "encyclopedia/newpage.html", {
            "form": form
        })
        else:
            return HttpResponseRedirect(reverse('wiki:index'))

    else:
        return render(request, "encyclopedia/newpage.html", {
            "form": NewPageForm()
        })
    
def edit(request, entry):

    if request.method == 'POST':
        print("test2")
        util.save_entry(entry, bytes(request.POST["markdown"], 'utf8')) #Returns the data to 'utf8', since it was recoded from utf-8 in get_entry. Prevents edited markdown from adding spaces.
        return HttpResponseRedirect(f'/wiki/{entry}')
    
    else:
        return render(request, "encyclopedia/edit.html", {
            "entry": entry,
            "form": EditPageForm(initial={'markdown': util.get_md_entry(entry)})
        })
    
def random(request):
    entry = choice(util.list_entries())
    return HttpResponseRedirect(f'/wiki/{entry}')



    