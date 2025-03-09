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


class Challenge(models.Model):
    CATEGORY_CHOICES = [
        ('Web', 'Web Exploitation'),
        ('Reverse', 'Reverse Engineering'),
        ('Crypto', 'Cryptography'),
        ('Forensics', 'Digital Forensics'),
        ('PWN', 'Binary Exploitation'),
        ('OSINT', 'OSINT'),
        ('Miscllaneous', 'Miscllaneous'),
    ]
    SUBCATEGORY_CHOICES = [
        ('RSA', 'RSA'),
        ('SQL Injection', 'SQL Injection'),
        ('Memory Forensics', 'Memory Forensics'),
        ('XSS', 'XSS'),
        ('Steganography', 'Steganography'),
        ('Dynamic', 'Dynamic'),
    ]
    DIFFICULTY_CHOICES = [
        ('Easy', 'Easy'),
        ('Medium', 'Medium'),
        ('Hard', 'Hard'),
    ]

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255, choices=CATEGORY_CHOICES)
    subcategory = models.CharField(max_length=255, choices=SUBCATEGORY_CHOICES)
    difficulty = models.CharField(max_length=255, choices=DIFFICULTY_CHOICES)
    creator = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)  # Track creation time

    def __str__(self):
        return self.name
