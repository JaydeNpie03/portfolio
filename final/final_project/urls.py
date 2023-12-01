from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("create", views.create, name="create"),
    path("posts", views.posts_view, name="posts"),
    path("practice", views.practice_view, name="practice"),
    path("getposts", views.get_posts, name="getposts"),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)