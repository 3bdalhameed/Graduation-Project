from django.db import models
from django.contrib.auth.models import User

class Teams(models.Model):
    name = models.CharField(max_length=50)
    points = models.IntegerField()
    rank = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)  # Track creation time
    updated_at = models.DateTimeField(auto_now=True)  # Track update time

    def __str__(self):
        return self.name

class Users(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Teams, on_delete=models.CASCADE, related_name='members')
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)  # Unique already managed by User model
    created_at = models.DateTimeField(auto_now_add=True)  # Track creation time

    def __str__(self):
        return self.name

class Challenge(models.Model):
    CATEGORY_CHOICES = [
        ('Web', 'web exploitation'),
        ('Reverse', 'Reverse Engineering'),
        ('Crypto', 'Cryptography'),
        ('Forensics', 'Digital Forensics'),
        ('PWN', 'Binary Exploitation'),
        ('OSINT', 'OSINT'),
    ]
    SUBCATEGORY_CHOICES = [
        ('RSA', 'rsa'),
        ('XSS', 'xss'),
        ('Dynamic', 'dynamic')
    ]
    DIFFICULTY_CHOICES = [
        ('Easy', 'Easy'),
        ('Medium', 'Medium'),
        ('Hard', 'Hard'),
    ]

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255, choices=CATEGORY_CHOICES)  # Using choices
    subcategory = models.CharField(max_length=255, choices=SUBCATEGORY_CHOICES)
    difficulty = models.CharField(max_length=255, choices=DIFFICULTY_CHOICES)  # Using choices
    creator = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)  # Track creation time

    def __str__(self):
        return self.Cname


