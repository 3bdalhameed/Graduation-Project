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