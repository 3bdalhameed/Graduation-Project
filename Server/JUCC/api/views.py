from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_201_CREATED, HTTP_205_RESET_CONTENT
from .serializer import ChallengeSerializer
from datetime import datetime, timedelta
from rest_framework_simplejwt.exceptions import TokenError
import random
import re

Users = get_user_model()
otp_storage = {}  # Store OTPs in-memory


class HomeView(APIView):
    permission_classes = (IsAuthenticated, )   
    def get(self, request):
        content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}   
        return Response(content)

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
            tokens = RefreshToken.for_user(user)
            return Response({
                "access_token": str(tokens.access_token),
                "refresh_token": str(tokens),
            }, status=200)
        return Response({"error": "Invalid credentials"}, status=400)

###############################################################################################################################################

class LogoutView(APIView):     
    permission_classes = (IsAuthenticated,)
    def post(self, request):
          try:
              refresh_token = request.data["refresh_token"]
              token = RefreshToken(refresh_token)
              token.blacklist()
              return Response(status=HTTP_205_RESET_CONTENT)
          except Exception as e:               
              return Response(status=HTTP_400_BAD_REQUEST)
###############################################################################################################################################

import re
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from django.contrib.auth.models import User

class SignUpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        # Validate fields
        if not username or not email or not password:
            return Response({"error": "All fields are required"}, status=HTTP_400_BAD_REQUEST)

        # Check if username is already taken
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=HTTP_400_BAD_REQUEST)

        # Check if email is already registered
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already registered"}, status=HTTP_400_BAD_REQUEST)

        # Validate password complexity
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
    
###############################################################################################################################################

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

from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views import View

class UsersListView(View):
    def get(self, request, *args, **kwargs):
        users = User.objects.values("username", "date_joined").order_by("-date_joined")
        return JsonResponse(list(users), safe=False)

###############################################################################################################################################

class ValidateTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get("token")

        if not token:
            return Response({"error": "Token is required"}, status=400)

        try:
            access_token = AccessToken(token)
            return Response({"valid": True, "payload": access_token.payload}, status=200)
        except InvalidToken:
            return Response({"valid": False, "error": "Invalid or expired token"}, status=400)
        except TokenError as e:
            return Response({"valid": False, "error": str(e)}, status=400)


###############################################################################################################################################

class AuthenticationCheckView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"authenticated": True}, status=HTTP_200_OK)

class NotAuthenticatedView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"authenticated": False}, status=HTTP_200_OK)

###############################################################################################################################################

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Team, TeamMember
from .serializer import TeamSerializer
import random
import string

def generate_unique_code():
    while True:
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        if not Team.objects.filter(code=code).exists():
            return code

class CreateTeamView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        team_name = request.data.get("team_name")
        if not team_name:
            return Response({"error": "Team name is required."}, status=400)

        code = generate_unique_code()
        try:
            # Create the team
            team = Team.objects.create(name=team_name, code=code, created_by=request.user)

            # Add the creator as a TeamMember
            TeamMember.objects.create(user=request.user, team=team, role="Admin")

            return Response(
                {"message": "Team created successfully.", "team_id": team.id},
                status=201
            )
        except Exception as e:
            return Response({"error": str(e)}, status=500)

###############################################################################################################################################

class JoinTeamView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        code = request.data.get("code")
        if not code:
            return Response({"error": "Team code is required."}, status=400)

        try:
            team = Team.objects.get(code=code)
        except Team.DoesNotExist:
            return Response({"error": "Invalid team code."}, status=400)

        if request.user in team.member.all():
            return Response({"error": "You are already a member of this team."}, status=400)

        team.members.add(request.user)
        serializer = TeamSerializer(team)
        return Response({"message": "Successfully joined the team!", "team": serializer.data}, status=200)

###############################################################################################################################################

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class TeamCheckView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the user's team information
        team_member = TeamMember.objects.filter(user=request.user).first()

        if team_member:
            return Response({
                "in_team": True,
                "team_id": team_member.team.id,
                "team_name": team_member.team.name,
                "role": team_member.role
            })

        return Response({"in_team": False})


###############################################################################################################################################

from .models import Team
from .serializer import TeamSerializer
class TeamProfile(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, team_id):
        try:
            team = Team.objects.get(id=team_id)
            if not team.member.filter(user=request.user).exists() and team.created_by != request.user:
                return Response({"error": "You are not a member of this team"}, status=403)
            
            serializer = TeamSerializer(team)
            return Response(serializer.data, status=200)
        
        except Team.DoesNotExist:
            return Response({"error": "Team not Found"}, status=404)