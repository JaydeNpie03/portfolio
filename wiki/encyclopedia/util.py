import re

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from markdown2 import Markdown


def list_entries():
    """
    Returns a list of all names of encyclopedia entries.
    """
    _, filenames = default_storage.listdir("entries")
    return list(sorted(re.sub(r"\.md$", "", filename)
                for filename in filenames if filename.endswith(".md")))

def new_entry(title, content):
    """
    Creates a new encyclopedia entry, given its title and Markdown
    content. If an existing entry with the same title already exists,
    raises an error.
    """
    filename = f"entries/{title}.md"
    if default_storage.exists(filename):
        raise ValueError
    else:
        default_storage.save(filename, ContentFile(content))

def save_entry(title, content):
    """
    Saves an encyclopedia entry, given its title and Markdown
    content. If an existing entry with the same title already exists,
    it is replaced.
    """
    filename = f"entries/{title}.md"
    if default_storage.exists(filename):
        default_storage.delete(filename)
    default_storage.save(filename, ContentFile(content))
    
def get_entry(title):
    """
    Retrieves an encyclopedia entry by its title. If no such
    entry exists, the function returns None.
    """
    try:
        md = Markdown()
        f = default_storage.open(f"entries/{title}.md")
        info = f.read().decode("utf-8")
        return md.convert(info)
    
    except FileNotFoundError:
        return None
    
def get_md_entry(title):
    """
    Retrieves an encyclopedia entry by its title. If no such
    entry exists, the function returns None.
    """
    try:
        f = default_storage.open(f"entries/{title}.md")
        return f.read().decode("utf-8")
    
    except FileNotFoundError:
        return None
    

