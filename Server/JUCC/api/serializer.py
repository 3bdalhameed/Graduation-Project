from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Challenge, Team, TeamMember
from .models import SolvedChallenges, Challenge

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
    members = TeamMemberSerializer(source='member', many=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'code', 'points', 'rank', 'created_by', 'members']

#########################################################################################################

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ['name', 'category', 'subcategory', 'difficulty', 'creator']
    def create(self, validated_data):
        """
        Overriding the create method to create a new Challenge instance.
        """
        return Challenge.objects.create(**validated_data)

#########################################################################################################

class SubmitFlagSerializer(serializers.Serializer):
    challenge_id = serializers.IntegerField()
    flag = serializers.CharField()

class SolvedChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolvedChallenges
        fields = "__all__"

