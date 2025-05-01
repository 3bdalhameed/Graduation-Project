# models.py

from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.text import slugify
from django.utils import timezone
from datetime import timedelta

# ========================================
# 1. Custom SchoolUser Manager
# ========================================
class SchoolUserManager(BaseUserManager):
    def create_user(self, email, role, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        if role not in ['student', 'teacher']:
            raise ValueError("Role must be either 'student' or 'teacher'")
        email = self.normalize_email(email)
        user = self.model(email=email, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, role='admin', password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, role, password, **extra_fields)

# ========================================
# 2. Custom SchoolUser Model
# ========================================
from django.contrib.auth.models import PermissionsMixin, Group, Permission

class SchoolUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
    ]
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # ADD THESE TWO FIELDS MANUALLY TO AVOID CONFLICT:
    groups = models.ManyToManyField(
        Group,
        related_name='schooluser_set',  # <<<<<< Related name UNIQUE to SchoolUser
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='schooluser_set',  # <<<<<< Related name UNIQUE to SchoolUser
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    objects = SchoolUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['role', 'name']

    def __str__(self):
        return f"{self.name} ({self.role})"

# ========================================
# School portal courses and stuff
# ========================================

from django.db import models
from .models import SchoolUser  # Import your SchoolUser model correctly

# --- New Models for the School Portal ---

class SchoolCourse(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(
        SchoolUser,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'teacher'},
        related_name='created_courses'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    # SchoolCourse model (optional)
    def enrolled_students(self):
        return SchoolEnrollment.objects.filter(course=self)

    def __str__(self):
        return self.name

class CourseTeacher(models.Model):
    teacher = models.ForeignKey(
        SchoolUser,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'teacher'},
        related_name='assigned_courses'
    )
    course = models.ForeignKey(
        SchoolCourse,
        on_delete=models.CASCADE,
        related_name='teachers'
    )
    assigned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('teacher', 'course')

    def __str__(self):
        return f"{self.teacher.name} assigned to {self.course.name}"

class SchoolMaterial(models.Model):
    course = models.ForeignKey(SchoolCourse, on_delete=models.CASCADE, related_name='materials')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    link = models.URLField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class SchoolAssessment(models.Model):
    course = models.ForeignKey(SchoolCourse, on_delete=models.CASCADE, related_name='assessments')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    

from django.db import models
from .models import SchoolUser, SchoolAssessment, SchoolCourse

class QuizQuestion(models.Model):
    QUESTION_TYPES = (
        ('text', 'Text Answer'),
        ('mcq', 'Multiple Choice'),
        ('file', 'File Upload'),
    )

    assessment = models.ForeignKey(SchoolAssessment, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    question_type = models.CharField(max_length=10, choices=QUESTION_TYPES)
    options = models.JSONField(blank=True, null=True)  # only for MCQ
    correct_answer = models.CharField(max_length=255, blank=True, null=True)  # ✅ add this line

    def __str__(self):
        return self.question_text

class QuizSubmission(models.Model):
    student = models.ForeignKey(SchoolUser, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    assessment = models.ForeignKey(SchoolAssessment, on_delete=models.CASCADE, related_name='submissions')
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'assessment')  # ❗ Prevent multiple submissions

    def __str__(self):
        return f"{self.student.name} - {self.assessment.title}"

class QuizAnswer(models.Model):
    submission = models.ForeignKey(QuizSubmission, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE)
    text_answer = models.TextField(blank=True, null=True)
    file_upload = models.FileField(upload_to='quiz_uploads/', blank=True, null=True)

    def __str__(self):
        return f"Answer to: {self.question.question_text}"



# ========================================
# 3. Continue other imports now
# ========================================
from django.contrib.auth import get_user_model
User = get_user_model()

# ========================================
# 4. Normal Models
# ========================================

# Profile
class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} Profile"

# Team
class Team(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=10, unique=True)
    rank = models.IntegerField(default=1)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="created_teams")

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

# Team Member
class TeamMember(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='members')
    role = models.CharField(max_length=50, default="Member")

    def __str__(self):
        return f"{self.user.username} - {self.team.name}"

# OTP
class OTP(models.Model):
    email = models.EmailField()
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)

    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(minutes=5)

# Challenge
class Challenge(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    flag = models.CharField(max_length=255)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="challenges")
    created_at = models.DateTimeField(auto_now_add=True)
    points = models.IntegerField(default=0)
    slug = models.SlugField(blank=True)
    category = models.CharField(max_length=255, default='Web')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

# Solved Challenge
class SolvedChallenge(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="solved_challenges")
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE, related_name="solved_by")
    solved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'challenge')

    def __str__(self):
        return f"{self.user.username} solved {self.challenge.title}"

# User Role
class UserRole(models.Model):
    ADMIN = 'Admin'
    USER = 'User'
    ROLE_CHOICES = [(ADMIN, 'Admin'), (USER, 'User')]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=USER)

    def __str__(self):
        return f"{self.user.username} - {self.role}"

# User School Role
class UserSchoolRole(models.Model):
    ADMIN = 'admin'
    TEACHER = 'teacher'
    STUDENT = 'student'

    ROLE_CHOICES = [
        (ADMIN, 'Admin'),
        (TEACHER, 'Teacher'),
        (STUDENT, 'Student'),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=STUDENT)

    def __str__(self):
        return f"{self.user.username} - {self.role}"

# Course
class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="courses")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# Learning Material
class LearningMaterial(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()
    content = models.TextField(default='')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    link = models.URLField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.title

# Assessment
class Assessment(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=20)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    type = models.CharField(max_length=20, default='mcq')

    def __str__(self):
        return self.name

# Solved Assessment
class SolvedAssessment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    score = models.IntegerField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.assessment.name}"

# Question
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
    
class SchoolEnrollment(models.Model):
    student = models.ForeignKey(SchoolUser, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    course = models.ForeignKey(SchoolCourse, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'course')

    def __str__(self):
        return f"{self.student.email} in {self.course.name}"
