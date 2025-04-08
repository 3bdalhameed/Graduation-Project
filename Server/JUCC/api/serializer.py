from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Challenge, Team, TeamMember

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}} # -> Hide password 

    def create(self, validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password']) # Hash password
        user.save()
        return user

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


#########################################################################################################

class ChallengeSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    
    class Meta:
        model = Challenge
        fields = ['id', 'title', 'description', 'created_by', 'created_at', 'category', 'points', 'flag']
        
        
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
