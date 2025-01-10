from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_201_CREATED
from .serializer import ChallengeSerializer
from datetime import datetime, timedelta
import random
import re

Users = get_user_model()
otp_storage = {}  # Store OTPs in-memory

###############################################################################################################################################
class TokenHelper:
    @staticmethod
    def get_tokens_for_user(user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

###############################################################################################################################################

    @staticmethod
    def verify_token(token):
        try:
            access = AccessToken(token)
            return access.payload  # Contains user_id, etc.
        except InvalidToken:
            return None

###############################################################################################################################################

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
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
                return Response({"message": "OTP sent to your email. Please verify."}, status=HTTP_200_OK)
            except Exception as e:
                return Response({"error": f"Failed to send OTP. Error: {e}"}, status=500)

        return Response({"error": "Invalid username or password"}, status=HTTP_400_BAD_REQUEST)

###############################################################################################################################################

class SignUpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not email or not password:
            return Response({"error": "All fields are required"}, status=HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already registered"}, status=HTTP_400_BAD_REQUEST)

        password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
        if not re.match(password_regex, password):
            return Response({
                "error": (
                    "Password must be at least 8 characters long, "
                    "contain uppercase and lowercase letters, a number, and a special character."
                )
            }, status=HTTP_400_BAD_REQUEST)

        otp = random.randint(100000, 999999)
        otp_storage[email] = {"otp": otp, "expires_at": datetime.now() + timedelta(minutes=1)}

        try:
            send_mail(
                "Your Signup OTP Code",
                f"Enter Your One-Time Password (OTP) to verify your email : {otp}",
                settings.EMAIL_HOST_USER,
                [email],
            )
            return Response({"message": "OTP sent to your email. Please verify."}, status=HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Failed to send OTP. Error: {e}"}, status=500)

###############################################################################################################################################

class VerifySignUpOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        otp = request.data.get('otp')

        if email not in otp_storage:
            return Response({"error": "No OTP found. Please sign up again."}, status=HTTP_400_BAD_REQUEST)

        user_otp = otp_storage[email]
        if datetime.now() > user_otp['expires_at']:
            del otp_storage[email]
            return Response({"error": "OTP has expired. Please sign up again."}, status=HTTP_400_BAD_REQUEST)

        if str(otp) != str(user_otp['otp']):
            return Response({"error": "Invalid OTP"}, status=HTTP_400_BAD_REQUEST)

        del otp_storage[email]
        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({"message": "Sign-up successful!"}, status=HTTP_200_OK)

class ChallengeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = {
            'name': request.data.get('name'),
            'category': request.data.get('category'),
            'subcategory': request.data.get('subcategory'),
            'difficulty': request.data.get('difficulty'),
            'creator': request.data.get('creator'),
        }

        if not all(data.values()):
            return Response({"error": "All fields are required."}, status=HTTP_400_BAD_REQUEST)

        if data['difficulty'] not in ["Easy", "Medium", "Hard"]:
            return Response({"error": "Difficulty must be one of: Easy, Medium, or Hard."}, status=HTTP_400_BAD_REQUEST)

        serializer = ChallengeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "Challenge created successfully", "data": serializer.data}, status=HTTP_201_CREATED)
        else:
            return Response({"error": "Invalid data", "details": serializer.errors}, status=HTTP_400_BAD_REQUEST)

###############################################################################################################################################

class AuthenticationCheckView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"authenticated": True}, status=HTTP_200_OK)

class NotAuthenticatedView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"authenticated": False}, status=HTTP_200_OK)
