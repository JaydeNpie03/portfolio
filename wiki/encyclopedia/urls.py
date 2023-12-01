from django.urls import path

from . import views

app_name = "wiki"
urlpatterns = [
    path("", views.index, name="index"),
    path('wiki/<str:title>', views.render_entry, name="render_entry"),
    path("search/", views.search, name="search"),
    path("new/", views.new, name="new"),
    path("wiki/<str:entry>/edit/", views.edit, name="edit"),
    path("random/", views.random, name="random")
]
