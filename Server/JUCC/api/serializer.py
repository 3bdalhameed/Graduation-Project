from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Challenge

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}} # -> Hide password 

    def create(self, validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password']) # Hash password
        user.save()
        return user

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ['name', 'category', 'subcategory', 'difficulty', 'creator']        
    def create(self, validated_data):
        """
        Overriding the create method to create a new Challenge instance.
        """
        return Challenge.objects.create(**validated_data)
