from rest_framework.response import Response
from django.contrib.auth import authenticate, get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .serializer import ChallengeSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.conf import settings
from datetime import datetime, timedelta
import random
import re

Users = get_user_model()

# Store OTPs in-memory (or use a database for better scalability)
otp_storage = {}

########################################################################################################################

# Helper function to generate tokens
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    
########################################################################################################################

# Helper function to verify tokens
def verify_token(token):
    try:
        access = AccessToken(token)
        return access.payload  # Contains user_id, etc.
    except InvalidToken:
        return None

########################################################################################################################

# Login view
@ensure_csrf_cookie
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user:
        otp = random.randint(100000, 999999)
        otp_storage[user.username] = {"otp": otp, "expires_at": datetime.now() + timedelta(minutes=5)}

        try:
            send_mail(
                "Your OTP Code",
                f"Your One-Time Password (OTP) is: {otp}",
                settings.EMAIL_HOST_USER,
                [user.email],
            )
            return Response({"message": "OTP sent to your email. Please verify."}, status=200)
        except Exception as e:
            return Response({"error": f"Failed to send OTP. Error: {e}"}, status=500)

    return Response({"error": "Invalid username or password"}, status=400)

########################################################################################################################

# Signup view
@api_view(['POST'])
@permission_classes([AllowAny])
def signUp_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({"error": "All fields are required"}, status=400)

    # Check if username is unique
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=400)

    # Check if email is unique
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already registered"}, status=400)

    # Validate password strength
    password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
    if not re.match(password_regex, password):
        return Response({
            "error": (
                "Password must be at least 8 characters long, "
                "contain uppercase and lowercase letters, a number, and a special character."
            )
        }, status=400)

    # Generate and store OTP
    otp = random.randint(100000, 999999)
    otp_storage[email] = {"otp": otp, "expires_at": datetime.now() + timedelta(minutes=5)}

    # Send OTP via email
    try:
        send_mail(
            "Your Signup OTP Code",
            f"Enter Your One-Time Password (OTP) to verify your email : {otp}",
            settings.EMAIL_HOST_USER,
            [email],
        )
        return Response({"message": "OTP sent to your email. Please verify."}, status=200)
    except Exception as e:
        return Response({"error": f"Failed to send OTP. Error: {e}"}, status=500)

########################################################################################################################

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_signup_otp(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    otp = request.data.get('otp')

    if email not in otp_storage:
        return Response({"error": "No OTP found. Please sign up again."}, status=400)

    user_otp = otp_storage[email]

    if datetime.now() > user_otp['expires_at']:
        del otp_storage[email]
        return Response({"error": "OTP has expired. Please sign up again."}, status=400)

    if str(otp) != str(user_otp['otp']):
        return Response({"error": "Invalid OTP"}, status=400)

    # OTP is valid; create the user
    del otp_storage[email]
    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({"message": "Sign-up successful!"}, status=200)

########################################################################################################################

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


    
########################################################################################################################
@login_required
def check_authentication(request):
    return JsonResponse({"authenticated": True})

def not_authenticated(request):
    return JsonResponse({"authenticated": False})





