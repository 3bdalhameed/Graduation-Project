from django.db import models
from django.contrib.auth.models import User


class Team(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=10, unique=True)
    points = models.IntegerField(default=0)
    rank = models.IntegerField(default=1)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_teams")

    def __str__(self):
        return self.name


class TeamMember(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='member')
    role = models.CharField(max_length=50, default="Member")

    def __str__(self):
        return f"{self.user.username} - {self.team.name}"
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Link to Django's User model
    name = models.CharField(max_length=50)  # Real name
    created_at = models.DateTimeField(auto_now_add=True)  # Track creation time

    def __str__(self):
        return self.name


from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

class Challenge(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    flag = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="challenges")
    created_at = models.DateTimeField(auto_now_add=True)
    points = models.IntegerField(default=0)
    slug = models.SlugField(blank=True)  # ✅ Add slug field
    category = models.CharField(max_length=255, default='Web')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

