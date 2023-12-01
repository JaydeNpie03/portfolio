import json
import re
from .models import User, Post, PostComments

from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse

# Create your views here.

def index(request):
    if request.user.is_authenticated:
        request.user.points = calculatePoints(request.user)
        
    return render(request, 'final_project/index.html')

def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)

        # Attempt to sign user in
        em = data["email"]
        passw = data["password"]
        user = authenticate(request, username=em, password=passw)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Login successful!", "status": 200}, status=200)
        else:
            return JsonResponse({"message": "Invalid email and/or password.", "status": 400}, status=400)
    else:
        return JsonResponse({"message": "Should only be accessed through POST!"}, status=400)

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def posts_view(request):
    if request.user.is_authenticated:
        request.user.points = calculatePoints(request.user)
    
    return render(request, 'final_project/posts.html')

def get_posts(request):
    posts = [p.serialize() for p in Post.objects.all()]
    return JsonResponse(posts, safe=False)

def practice_view(request):
    if request.user.is_authenticated:
        request.user.points = calculatePoints(request.user)
        
    return render(request, 'final_project/practice.html')

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]

        # Get user profile pic or set as default
        img = request.FILES["profile_img"] or "user_profile_pics/default.png"

        if password != confirmation:
            return JsonResponse({ "message": "Passwords must match.", "status":"400" })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.profile_img = img
            user.save()
            
        except IntegrityError as e:
            print(e)
            return JsonResponse({ "message": "Username already taken.", "status": 400 })
        login(request, user)
        return JsonResponse({ "message": "Registration successful!", "status": 200 }, status=200)
    else:
        return JsonResponse({ "message": "Should be accessed through POST!" }, status=400)

def create(request):
    if request.method == "POST":
        p = Post(
            op = request.user,
            kanji = request.POST["kanji"],
            category = request.POST["category"],
            caption = request.POST["caption"]
        )
        p.save()
        request.user.points = calculatePoints(request.user)

        messages.success(request, "Post created successfully!")
        return HttpResponseRedirect(reverse("index"))
    else:
        messages.warning(request, "Must be accessed via POST request!")
        return HttpResponseRedirect(reverse("index"))
    
def comment(request):
    if request.method == "POST":
        data = json.loads(request.body)
        post = Post.objects.get(id=data["post_id"])
        p = PostComments(
            op = request.user,
            content = data["content"],
            post = post
        )
        p.save()
        post.op.points = calculatePoints(post.op)
        request.user.points = calculatePoints(request.user)
        return JsonResponse({"message":"Comment created successfully!"}, status=200)
    else:
        return JsonResponse({"message":"Must access with a POST request!"}, status=400)

def calculatePoints(user):
    pcmts = 0
    for p in user.all_posts.all():
        pcmts += p.post_comments.count()

    pts = (user.all_posts.count() * 150) + (user.user_comments.count() * 80) + (pcmts * 80)
    return pts