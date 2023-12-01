# Simple Wiki Database 

A simple website developed using the [Django Web Framework](https://www.djangoproject.com/) that stores and retrieves wiki "entries", which are stored locally as .md files.

## How it Works

Since this isn't a published site, the user will have to download the files and run "python manage.py runserver" in their terminal from the download directory. Navigate to the IP given by the terminal, and you will be greeted by the index page. You may then nagivate the site as normal. When finished, close the terminal (or if in VS Code, press Ctrl + C) to terminate the connection.


### Templates 

**layout.html** - Provides the sidebar containing the search bar, *Home*, *Create a Page*, and *Random Page* links. Contains a *body* block and a *title* block, both of which are provided by whichever other file is inheriting it at the moment. Every other template .html file inherits this file.

**index.html** - Provides the layout for the index (home) page.

**entry.html** - Provides the layout scheme for the wiki entry pages.

**search.html** - Provides the layout for the "search results" page.

**newpage.html** - Provides layout for the *Create a New Page* button present on the sidebar.

**edit.html** - Provides layout for the *Edit This Page* button present on every valid wiki entry page.