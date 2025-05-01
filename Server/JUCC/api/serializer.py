from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Challenge, Team, TeamMember

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import QuizQuestion
from .models import QuizQuestion, QuizAnswer, QuizSubmission, SchoolAssessment


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'email': {'required': True},
        }

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # Securely hash the password
        user.save()
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'date_joined']
        
#########################################################################################################

from rest_framework import serializers

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'user', 'role']

class TeamSerializer(serializers.ModelSerializer):
    members = TeamMemberSerializer(source='member', many=True, required=False)

    class Meta:
        model = Team
        fields = ['id', 'name', 'code', 'rank', 'created_by', 'members']
        
# serializer.py
from rest_framework import serializers
from .models import Team

class TeamScoreSerializer(serializers.ModelSerializer):
    points = serializers.SerializerMethodField()
    members = serializers.StringRelatedField(many=True)

    class Meta:
        model = Team
        fields = ['name', 'members', 'points']

    def get_points(self, obj):
        return obj.points  # Uses the @property
    
########################################################################################################
from rest_framework import serializers
from .models import SchoolUser
from django.contrib.auth import authenticate

class SchoolSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = SchoolUser
        fields = ['email', 'name', 'role', 'password']

    def create(self, validated_data):
        user = SchoolUser.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            role=validated_data['role'],
            password=validated_data['password']
        )
        return user

class SchoolLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return {'user': user}


from rest_framework import serializers
from .models import SchoolCourse

class SchoolCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolCourse
        fields = ['id', 'name', 'description', 'created_by', 'created_at']

from .models import SchoolMaterial, SchoolAssessment

class SchoolMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolMaterial
        fields = ['id', 'title', 'description', 'link', 'uploaded_at']

class SchoolAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolAssessment
        fields = ['id', 'title', 'description', 'due_date', 'created_at']

class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ['id', 'question_text', 'question_type', 'options']

#########################################################################################################

class ChallengeSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    
    class Meta:
        model = Challenge
        fields = ['id', 'title', 'description', 'created_by', 'created_at', 'category', 'points', 'flag']
        
        
from .models import SolvedChallenge
class SolvedChallengeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    challenge_title = serializers.CharField(source='challenge.title')

    class Meta:
        model = SolvedChallenge
        fields = ['id', 'username', 'challenge_title', 'solved_at']

        
#########################################################################################################
        
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from api.models import UserRole

class RoleLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    role = serializers.ChoiceField(choices=UserRole.ROLE_CHOICES)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        role = data.get("role")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password.")

        user = authenticate(username=user.username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid email or password.")

        try:
            user_role = user.userrole.role
        except UserRole.DoesNotExist:
            raise serializers.ValidationError("User role not set.")

        if user_role != role:
            raise serializers.ValidationError("Incorrect role selected.")

        data["user"] = user
        return data


from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'created_by', 'created_at']
        read_only_fields = ['id', 'created_by', 'created_at']


from rest_framework import serializers
from .models import LearningMaterial
class LearningMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningMaterial
        fields = ['id', 'title', 'category', 'description', 'content', 'link'] 
        read_only_fields = ['id']

        



from rest_framework import serializers
from .models import Assessment, Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['question', 'option1', 'option2', 'option3', 'option4', 'answer']
        
class AssessmentSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Assessment
        fields = ['id', 'name', 'category', 'difficulty', 'type', 'questions']

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        assessment = Assessment.objects.create(**validated_data)

        for question_data in questions_data:
            required_fields = ["question", "option1", "option2", "option3", "option4", "answer"]
            for field in required_fields:
                if not question_data.get(field):
                    raise serializers.ValidationError({field: f"'{field}' cannot be empty."})

            Question.objects.create(assessment=assessment, **question_data)

        return assessment
    def update(self, instance, validated_data):
        questions_data = validated_data.pop('questions', [])

        instance.name = validated_data.get('name', instance.name)
        instance.category = validated_data.get('category', instance.category)
        instance.difficulty = validated_data.get('difficulty', instance.difficulty)
        instance.type = validated_data.get('type', instance.type)
        instance.save()

        if questions_data:
            instance.questions.all().delete()  # or update them individually
            for question_data in questions_data:
                Question.objects.create(assessment=instance, **question_data)

        return instance


from rest_framework import serializers
from .models import SolvedAssessment

class SolvedAssessmentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    assessment_name = serializers.CharField(source='assessment.name', read_only=True)
    assessment = serializers.PrimaryKeyRelatedField(queryset=Assessment.objects.all())  # Add this line

    class Meta:
        model = SolvedAssessment
        fields = ['username', 'assessment_name', 'assessment', 'score']  # Include assessment



