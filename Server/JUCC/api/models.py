from datetime import datetime, time
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        
class Team(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=10, unique=True)
    rank = models.IntegerField(default=1)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_teams")

    def __str__(self):
        return self.name
    
    @property
    def points(self):
        total = 0
        for member in self.members.all():
            try:
                total += member.user.profile.points
            except Exception:
                total += 0
        return total



class TeamMember(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='members')
    role = models.CharField(max_length=50, default="Member")

    def __str__(self):
        return f"{self.user.username} - {self.team.name}"
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Link to Django's User model
    name = models.CharField(max_length=50)  # Real name
    created_at = models.DateTimeField(auto_now_add=True)  # Track creation time
    points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} Profile"


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

class SolvedChallenge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="solved_challenges")
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE, related_name="solved_by")
    solved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'challenge')

    def __str__(self):
        return f"{self.user.username} solved {self.challenge.title}"
    
class UserRole(models.Model):
    ADMIN = 'Admin'
    USER = 'User'
    ROLE_CHOICES = [(ADMIN, 'Admin'), (USER, 'User')]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=USER)

    def __str__(self):
        return f"{self.user.username} - {self.role}"
    
    
    
    
# api/models.py

from django.db import models
from django.contrib.auth.models import User

class UserSchoolRole(models.Model):
    ADMIN = 'admin'
    TEACHER = 'teacher'
    STUDENT = 'student'

    ROLE_CHOICES = [
        (ADMIN, 'Admin'),
        (TEACHER, 'Teacher'),
        (STUDENT, 'Student'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=STUDENT)

    def __str__(self):
        return f"{self.user.username} - {self.role}"


from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="courses")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


from django.db import models
from django.contrib.auth.models import User


class LearningMaterial(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()
    content = models.TextField(default='')  # ⬅️ Add this line
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    link = models.URLField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.title



from django.db import models
from django.contrib.auth.models import User

class Assessment(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=20)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=20, default='mcq')  # extendable for future types

    def __str__(self):
        return self.name


from django.db import models
from django.contrib.auth.models import User
from .models import Assessment  # import your Assessment model

class SolvedAssessment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    score = models.IntegerField()
    total_questions = models.IntegerField(default=1)
    submitted_at = models.DateTimeField(auto_now_add=True)
    


    def __str__(self):
        return f"{self.user.username} - {self.assessment.name}"


class Question(models.Model):
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='questions')
    question = models.TextField()
    option1 = models.CharField(max_length=255, default="")
    option2 = models.CharField(max_length=255, default="")
    option3 = models.CharField(max_length=255, default="")
    option4 = models.CharField(max_length=255, default="")
    answer = models.CharField(max_length=255, default="")


    def __str__(self):
        return self.question


