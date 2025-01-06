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
from .serializer import ChallengeSerializer
from .models import Challenge
from .models import Users

Users = get_user_model()

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

###########################################################################
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


##########################################################################
@api_view(['POST'])
@permission_classes([AllowAny])
def Challenge_view(request):
    # Extract data from the request
    Cname = request.data.get('name')
    Ccatagory = request.data.get('category')
    Csubcatagory = request.data.get('subcategory')
    Cdifficulty = request.data.get('difficulty')
    Ccreator = request.data.get('creator')
    
    # Validate required fields
    if not Cname or not Ccatagory or not Csubcatagory or not Cdifficulty or not Ccreator:
        return Response({"error": "Challenge Name, Category, Subcategory, Difficulty, and Creator are required."}, status=400)
    
    # Additional validation can be added here (e.g., difficulty range, category options, etc.)
    if Cdifficulty not in ["Easy", "Medium", "Hard"]:
        return Response({"error": "Difficulty must be one of: Easy, Medium, or Hard."}, status=400)
    
    # Create the challenge instance
    try:
        challenge_data = {
            'name': Cname,
            'category': Ccatagory,
            'subcategory': Csubcatagory,
            'difficulty': Cdifficulty,
            'creator': Ccreator
        }
        
        # Serialize and save the data
        serializer = ChallengeSerializer(data=challenge_data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "Challenge created successfully", "data": serializer.data}, status=201)
        else:
            return Response({"error": "Invalid data", "details": serializer.errors}, status=400)
    except Exception as e:
        return Response({"error": "An error occurred while creating the challenge", "details": str(e)}, status=500)


    
###########################################################################
@login_required
def check_authentication(request):
    return JsonResponse({"authenticated": True})

def not_authenticated(request):
    return JsonResponse({"authenticated": False})





