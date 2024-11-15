from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Users

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        # Generate or get the token for the authenticated user
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "message": "Login successful"}, status=200)
    return Response({"error": "Invalid credentials"}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def signUp_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    # Check if required fields are present
    if not username or not email or not password:
        return Response({"error": "Username, email, and password are required"}, status=400)
    
    # Check if username or email already exists
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=400)
    
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already registered"}, status=400)
    
    # Create the user using create_user to hash the password automatically
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password  # create_user will hash this automatically
    )
    
    # Generate or get the token for the new user
    token, created = Token.objects.get_or_create(user=user)
    
    return Response({"token": token.key, "message": "Sign up successful"}, status=201)


@api_view(['POST'])
@permission_classes([AllowAny])
def CreateChallenge(request):
    Cname = request.data.get('Cname')
    Ccatagory = request.data.get('Ccatagory')
    Csubcatagory = request.data.get('Csubcatagory')
    Cdifficulty = request.data.get('Cdifficulty')
    Ccreater = request.data.get('Creater')
    

@login_required
def check_authentication(request):
    return JsonResponse({"authenticated": True})

def not_authenticated(request):
    return JsonResponse({"authenticated": False})





