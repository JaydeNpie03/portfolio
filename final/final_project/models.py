from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    profile_img = models.ImageField(upload_to='user_profile_pics')
    points = models.IntegerField(default=0)

class Post(models.Model):
    op = models.ForeignKey("User", on_delete=models.CASCADE, related_name="all_posts")
    kanji = models.CharField(max_length=32)
    category = models.CharField(max_length=16, default="use")
    caption = models.CharField(max_length=512)

    def serialize(self):
        return {
            "op": self.op.username,
            "kanji": self.kanji,
            "category": self.category,
            "caption": self.caption
        }

class PostComments(models.Model):
    op = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_comments")
    content = models.CharField(max_length=512)
    post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name="post_comments")