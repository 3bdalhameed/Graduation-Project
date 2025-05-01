from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_201_CREATED, HTTP_205_RESET_CONTENT, HTTP_404_NOT_FOUND
from datetime import datetime, timedelta
from rest_framework_simplejwt.exceptions import TokenError
import random
import re
from .models import SchoolEnrollment

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
    @staticmethod
    def verify_token(token):
        try:
            access = AccessToken(token)
            return access.payload  # Contains user_id, etc.
        except InvalidToken:
            return None
###############################################################################################################################################

from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

@api_view(["GET"])
@permission_classes([AllowAny])  # Allow anyone to get the CSRF token
def get_csrf_token(request):
    """Returns the CSRF token to the frontend."""
    csrf_token = get_token(request)  # Fetch CSRF token
    return JsonResponse({"csrfToken": csrf_token})

###############################################################################################################################################



from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer, UserProfileSerializer

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
from .models import Team
from .serializer import TeamSerializer
class TeamDetailView(generics.RetrieveAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [AllowAny]  
    
class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return User.objects.all()

    def get_object(self):
        username = self.kwargs['username']
        return self.get_queryset().get(username=username)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import SchoolSignupSerializer, SchoolLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SchoolUser, OTP
from django.core.mail import send_mail
import random
from rest_framework.permissions import AllowAny

class SendOTP(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        if SchoolUser.objects.filter(email=email).exists():
            return Response({"error": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

        otp_code = str(random.randint(100000, 999999))
        OTP.objects.create(email=email, otp_code=otp_code)

        send_mail(
            'Your OTP Code',
            f'Your OTP is {otp_code}',
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )

        return Response({"message": "OTP sent successfully."}, status=status.HTTP_200_OK)


#For school portal
class VerifyOTP(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        otp_code = request.data.get('otp')

        try:
            otp_entry = OTP.objects.filter(email=email).latest('created_at')
        except OTP.DoesNotExist:
            return Response({"error": "OTP not found."}, status=status.HTTP_404_NOT_FOUND)

        if otp_entry.is_expired():
            return Response({"error": "OTP expired."}, status=status.HTTP_400_BAD_REQUEST)

        if otp_entry.otp_code != otp_code:
            return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)

        otp_entry.is_verified = True
        otp_entry.save()
        return Response({"message": "OTP verified successfully."}, status=status.HTTP_200_OK)

import re

class SchoolSignup(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        role = request.data.get('role')
        name = request.data.get('name')

        # Validate OTP
        if not OTP.objects.filter(email=email, is_verified=True).exists():
            return Response({"error": "OTP not verified."}, status=status.HTTP_403_FORBIDDEN)

        # Validate required fields
        if not all([email, password, role, name]):
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate role
        if role not in ['student', 'teacher']:
            return Response({"error": "Invalid role."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate password complexity
        if len(password) < 8 or not re.search(r"[A-Z]", password) or not re.search(r"[a-z]", password) or not re.search(r"\d", password):
            return Response({"error": "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Check if user already exists
        if SchoolUser.objects.filter(email=email).exists():
            return Response({"error": "User already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Create user
        user = SchoolUser.objects.create_user(
            email=email,
            password=password,
            name=name,
            role=role,
        )

        return Response({"message": "Account created successfully."}, status=status.HTTP_201_CREATED)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import SchoolUser

class SchoolLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        role = request.data.get('role')

        if not email or not password or not role:
            return Response({"error": "Email, password, and role are required"}, status=400)

        try:
            user = SchoolUser.objects.get(email=email)
        except SchoolUser.DoesNotExist:
            return Response({"error": "No user found with this email"}, status=404)

        if not user.check_password(password):
            return Response({"error": "Incorrect password"}, status=400)

        if user.role != role:
            return Response({"error": f"You are not registered as a {role}"}, status=400)

        if not user.is_active:
            return Response({"error": "Account is disabled"}, status=400)

        # ✅ Create tokens manually (no OutstandingToken involved)
        refresh = RefreshToken()
        access_token = refresh.access_token

        # Optional: manually inject extra info into access token
        access_token['user_id'] = user.id
        access_token['role'] = user.role

        return Response({
            "access": str(access_token),
            "refresh": str(refresh),
            "role": user.role,
            "message": "Login successful!"
        })





from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import SchoolCourse, CourseTeacher, SchoolUser
from .serializer import SchoolCourseSerializer  # We'll write this serializer next

class CreateSchoolCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Ensure only teachers can create courses
        if request.user.role != 'teacher':
            return Response({"error": "Only teachers can create courses."}, status=status.HTTP_403_FORBIDDEN)

        name = request.data.get('name')
        description = request.data.get('description', '')

        if not name:
            return Response({"error": "Course name is required."}, status=status.HTTP_400_BAD_REQUEST)

        course = SchoolCourse.objects.create(
            name=name,
            description=description,
            created_by=request.user
        )

        # Automatically assign the creating teacher to the course
        CourseTeacher.objects.create(teacher=request.user, course=course)

        return Response({
            "message": "Course created successfully.",
            "course_id": course.id,
            "name": course.name,
            "description": course.description
        }, status=status.HTTP_201_CREATED)

class ListMyCoursesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role == 'teacher':
            # Show courses they created or are assigned to
            created_courses = SchoolCourse.objects.filter(created_by=user)
            assigned_courses = SchoolCourse.objects.filter(teachers__teacher=user)

            # Union and remove duplicates
            all_courses = (created_courses | assigned_courses).distinct()

        elif user.role == 'student':
            # 🚀 Later we'll implement Enrollment logic here
            all_courses = SchoolCourse.objects.none()

        else:
            # Admin sees all
            all_courses = SchoolCourse.objects.all()

        serializer = SchoolCourseSerializer(all_courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


from .models import SchoolCourse, SchoolMaterial, SchoolAssessment
from .serializer import SchoolMaterialSerializer, SchoolAssessmentSerializer

from django.shortcuts import get_object_or_404

class SchoolCourseDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        user = request.user
        try:
            course = SchoolCourse.objects.get(id=course_id)
        except SchoolCourse.DoesNotExist:
            return Response({'error': 'Course not found'}, status=404)

        # 🛡 Permission Check
        if user.role == 'student':
            if not SchoolEnrollment.objects.filter(course=course, student=user).exists():
                return Response({'error': 'You are not enrolled in this course'}, status=403)

        elif user.role == 'teacher':
            if course.created_by != user and not course.teachers.filter(teacher=user).exists():
                return Response({'error': 'You are not assigned to this course'}, status=403)

        # ✅ Access allowed
        materials = course.materials.all()
        assessments = course.assessments.all()

        return Response({
            'id': course.id,
            'name': course.name,
            'description': course.description,
            'materials': [{'id': m.id, 'title': m.title, 'description': m.description, 'link': m.link} for m in materials],
            'assessments': [{'id': a.id, 'title': a.title, 'description': a.description, 'due_date': a.due_date} for a in assessments]
        })


class AddMaterialView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, course_id):
        course = get_object_or_404(SchoolCourse, id=course_id)

        # Permissions
        user = request.user
        if user.role != 'teacher':
            return Response({"error": "Only teachers can add materials."}, status=403)

        if not (course.created_by == user or course.teachers.filter(teacher=user).exists()):
            return Response({"error": "Not authorized to add material to this course."}, status=403)

        title = request.data.get('title')
        description = request.data.get('description', '')
        link = request.data.get('link', '')

        if not title:
            return Response({"error": "Material title is required."}, status=400)

        material = SchoolMaterial.objects.create(
            course=course,
            title=title,
            description=description,
            link=link
        )

        return Response({
            "message": "Material added successfully.",
            "material_id": material.id,
            "title": material.title
        }, status=201)

class AddAssessmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, course_id):
        course = get_object_or_404(SchoolCourse, id=course_id)

        # Permissions
        user = request.user
        if user.role != 'teacher':
            return Response({"error": "Only teachers can add assessments."}, status=403)

        if not (course.created_by == user or course.teachers.filter(teacher=user).exists()):
            return Response({"error": "Not authorized to add assessment to this course."}, status=403)

        title = request.data.get('title')
        description = request.data.get('description', '')
        due_date = request.data.get('due_date', None)

        if not title:
            return Response({"error": "Assessment title is required."}, status=400)

        assessment = SchoolAssessment.objects.create(
            course=course,
            title=title,
            description=description,
            due_date=due_date
        )

        return Response({
            "message": "Assessment added successfully.",
            "assessment_id": assessment.id,
            "title": assessment.title
        }, status=201)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import (
    SchoolAssessment, QuizQuestion, QuizSubmission, QuizAnswer, SchoolUser
)
from .serializer import QuizQuestionSerializer
from django.db import transaction

class AddQuizQuestionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, assessment_id):
        user = request.user
        if user.role != 'teacher':
            return Response({"error": "Only teachers can add questions."}, status=403)

        assessment = get_object_or_404(SchoolAssessment, id=assessment_id)
        question_text = request.data.get('question_text')
        question_type = request.data.get('question_type')
        options = request.data.get('options', None)

        if not question_text or not question_type:
            return Response({"error": "question_text and question_type are required."}, status=400)

        question = QuizQuestion.objects.create(
            assessment=assessment,
            question_text=question_text,
            question_type=question_type,
            options=options if question_type == 'mcq' else None
        )

        return Response({"message": "Question added", "id": question.id}, status=201)

class GetQuizQuestionsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, assessment_id):
        user = request.user

        assessment = get_object_or_404(SchoolAssessment, id=assessment_id)

        # 🔒 If student, check if already submitted
        if user.role == 'student':
            if QuizSubmission.objects.filter(student=user, assessment=assessment).exists():
                return Response({"error": "You have already submitted this quiz."}, status=403)

        # ✅ Allow both teacher and student to fetch questions
        questions = assessment.questions.all()
        data = QuizQuestionSerializer(questions, many=True).data
        return Response(data, status=200)


import json
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.db import transaction
from .models import QuizSubmission, SchoolAssessment, SchoolUser, QuizAnswer, QuizQuestion


class SubmitQuizView(APIView):
    permission_classes = [IsAuthenticated]
    
    @transaction.atomic
    def post(self, request, assessment_id):
        user = request.user
        if user.role != 'student':
            return Response({"error": "Only students can submit quizzes."}, status=403)

        assessment = get_object_or_404(SchoolAssessment, id=assessment_id)

        if QuizSubmission.objects.filter(student=user, assessment=assessment).exists():
            return Response({"error": "You have already submitted this quiz."}, status=403)

        raw_answers = request.data.get('answers')
        if not raw_answers:
            return Response({"error": "Answers list is required."}, status=400)

        try:
            answers = json.loads(raw_answers)
        except json.JSONDecodeError:
            return Response({"error": "Invalid answer format."}, status=400)

        submission = QuizSubmission.objects.create(student=user, assessment=assessment)

        correct_count = 0
        total = len(answers)

        for ans in answers:
            question_id = ans.get('question_id')
            text = ans.get('text_answer', '')
            file = request.FILES.get(f'file_{question_id}', None)

            question = get_object_or_404(QuizQuestion, id=question_id, assessment=assessment)

            QuizAnswer.objects.create(
                submission=submission,
                question=question,
                text_answer=text,
                file_upload=file
            )

            # ✅ Scoring logic (only for text and mcq)
            if question.question_type in ['text', 'mcq']:
                student_ans = str(text or '').strip().lower()
                correct_ans = str(question.correct_answer or '').strip().lower()

                if student_ans == correct_ans:
                    correct_count += 1


        return Response({
            "message": "Quiz submitted successfully.",
            "score": correct_count,
            "total": total
        }, status=201)



class EnrollStudentInCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, course_id):
        user = request.user
        email = request.data.get('email')

        if not email:
            return Response({'error': 'Student email is required'}, status=400)

        try:
            student = SchoolUser.objects.get(email=email, role='student')
        except SchoolUser.DoesNotExist:
            return Response({'error': 'No student found with that email'}, status=404)

        try:
            course = SchoolCourse.objects.get(id=course_id)
        except SchoolCourse.DoesNotExist:
            return Response({'error': 'Course not found'}, status=404)

        # Check permissions
        if user.role == 'teacher' and course.created_by != user and not course.teachers.filter(teacher=user).exists():
            return Response({'error': 'You are not authorized to enroll students in this course'}, status=403)

        if user.role not in ['teacher', 'admin']:
            return Response({'error': 'Only teachers or admins can enroll students'}, status=403)

        # Create enrollment
        _, created = SchoolEnrollment.objects.get_or_create(student=student, course=course)
        if not created:
            return Response({'message': 'Student already enrolled'}, status=200)

        return Response({'message': f'{student.email} enrolled successfully'}, status=201)

class ListEnrolledCoursesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != 'student':
            return Response({'error': 'Only students can view this list'}, status=403)

        enrollments = SchoolEnrollment.objects.filter(student=user)
        courses = [en.course for en in enrollments]
        data = [{'id': c.id, 'name': c.name, 'description': c.description} for c in courses]
        return Response(data, status=200)



#######################################################################################################
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        print(request.data)
        user = authenticate(username=username, password=password)
        
        if user:
            tokens = RefreshToken.for_user(user)
            print(tokens)
            return Response({
                "access_token": str(tokens.access_token),
                "refresh_token": str(tokens),
            }, status=200)
        return Response({"error": "Invalid credentials"}, status=400)

###############################################################################################################################################

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
          
###############################################################################################################################################
          
class GetUserRoleView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        role = "User"
        if hasattr(request.user, 'userrole'):
            role = request.user.userrole.role
        print(role)
        return Response({"role": role}, status=HTTP_200_OK)

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

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_404_NOT_FOUND
from django.shortcuts import get_object_or_404
from .models import Challenge
from .serializer import ChallengeSerializer

class ChallengeListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        challenges = Challenge.objects.all()
        serializer = ChallengeSerializer(challenges, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    

from rest_framework.permissions import BasePermission, IsAuthenticated
class IsAdmin(BasePermission):
    """ Custom permission to allow only Admin users to modify challenges. """
    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user, 'userrole') and request.user.userrole.role == 'Admin'

class ChallengeCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, request):
        serializer = ChallengeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_403_FORBIDDEN, HTTP_404_NOT_FOUND
from django.shortcuts import get_object_or_404
class DeleteChallengeView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, challenge_id):
        challenge = get_object_or_404(Challenge, id=challenge_id)

        challenge.delete()
        return Response({"message": "Challenge deleted successfully."}, status=HTTP_204_NO_CONTENT)
    
    
class ChallengeEditView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, challenge_id):
        challenge = get_object_or_404(Challenge, id=challenge_id)
        
        serializer = ChallengeSerializer(challenge, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    

class ChallengeDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, challenge_id):
        challenge = get_object_or_404(Challenge, id=challenge_id)
        serializer = ChallengeSerializer(challenge)
        solved = False

        if request.user.is_authenticated:
            solved = SolvedChallenge.objects.filter(user=request.user, challenge=challenge).exists()

        return Response({"challenge": serializer.data, "solved": solved}, status=HTTP_200_OK)

from .models import Profile  # Make sure Profile is imported

class ChallengeSubmitView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, challenge_id):
        challenge = get_object_or_404(Challenge, id=challenge_id)
        submitted_flag = request.data.get("flag", "").strip()

        if submitted_flag == challenge.flag:
            # Check if already solved
            if SolvedChallenge.objects.filter(user=request.user, challenge=challenge).exists():
                return Response({"message": "✅ You already solved this challenge!"}, status=HTTP_200_OK)

            # Ensure Profile exists or create it
            profile, _ = Profile.objects.get_or_create(user=request.user)

            # Update profile points
            profile.points += challenge.points
            profile.save()

            # Create SolvedChallenge entry
            SolvedChallenge.objects.create(user=request.user, challenge=challenge)

            return Response({"message": "🎉 Correct flag! Challenge marked as solved."}, status=HTTP_201_CREATED)

        return Response({"message": "❌ Incorrect flag, try again."}, status=HTTP_400_BAD_REQUEST)




from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_200_OK
from .models import Challenge, SolvedChallenge
from .serializer import ChallengeSerializer

class SolvedChallengesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        solved_challenges = Challenge.objects.filter(
            id__in=SolvedChallenge.objects.filter(user=request.user).values_list('challenge', flat=True)
        )
        serializer = ChallengeSerializer(solved_challenges, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from .models import SolvedChallenge
from .serializer import SolvedChallengeSerializer

class SolvedChallengeLogsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        logs = SolvedChallenge.objects.select_related('user', 'challenge').all().order_by('-solved_at')
        serializer = SolvedChallengeSerializer(logs, many=True)
        return Response(serializer.data)


        
###############################################################################################################################################

from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views import View

class UsersListView(View):
    def get(self, request, *args, **kwargs):
        users = User.objects.values("username", "date_joined").order_by("-date_joined")
        return JsonResponse(list(users), safe=False)

###############################################################################################################################################

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

class ValidateTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get("token")
        print("🔐 Received token:", token)

        if not token:
            return Response({"valid": False, "error": "No token provided"}, status=400)

        try:
            access_token = AccessToken(token)
            return Response({"valid": True, "user_id": access_token['user_id']}, status=200)
        except Exception as e:
            print("❌ Token error:", str(e))
            return Response({"valid": False, "error": str(e)}, status=401)




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
from .models import Challenge, Team, TeamMember
from .serializer import ChallengeSerializer, TeamSerializer
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
        

from .serializer import TeamSerializer

class GetTeamsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data, status=200)

class ScoreboardAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        teams = Team.objects.all()
        sorted_teams = sorted(teams, key=lambda t: t.points, reverse=True)

        # Dummy progress for demonstration
        def simulate_progress(score):
            # Simulate score growth over 6 time points
            chunk = score // 6 if score > 0 else 0
            return [chunk * i for i in range(1, 7)]

        data = []
        for team in sorted_teams:
            data.append({
                "name": team.name,
                "points": team.points,
                "progress": simulate_progress(team.points),
            })

        return Response(data)

###############################################################################################################################################

class JoinTeamView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        code = request.data.get("code")
        print('code is:',code)
        if not code:
            return Response({"error": "Team code is required."}, status=400)

        try:
            team = Team.objects.get(code=code)
        except Team.DoesNotExist:
            return Response({"error": "Invalid team code."}, status=400)

        # Check if the user is already in the team
        if TeamMember.objects.filter(user=request.user, team=team).exists():
            return Response({"error": "You are already a member of this team."}, status=400)

        # Add user to the team
        TeamMember.objects.create(user=request.user, team=team)

        # Optional: re-serialize the team
        from .serializer import TeamSerializer
        serializer = TeamSerializer(team)
        return Response({"message": "Successfully joined the team!", "team": serializer.data}, status=200)


###############################################################################################################################################

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class TeamCheckView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        team_member = TeamMember.objects.filter(user=request.user).first()

        if team_member:
            team = team_member.team
            members = team.members.all()

            return Response({
                "in_team": True,
                "team_id": team.id,
                "team_name": team.name,
                "password": team.code,
                "points": team.points,
                "role": team_member.role,
                "members": [
                    {
                        "id": m.user.id,
                        "username": m.user.username,
                        "email": m.user.email
                    } for m in members
                ]
            }, status=HTTP_200_OK)

        return Response({"in_team": False}, status=HTTP_200_OK)


###############################################################################################################################################





from .models import Team
from .serializer import TeamSerializer
class TeamProfile(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, team_id):
        try:
            team = Team.objects.get(id=team_id)
            if not team.member.filter(user=request.user).exists() and team.created_by != request.user:
                return Response({"error": "You are not a member of this team"}, status=403)
            
            serializer = TeamSerializer(team)
            return Response(serializer.data, status=200)
        
        except Team.DoesNotExist:
            return Response({"error": "Team not Found"}, status=404)
        
        
###############################################################################################################################################
        

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from django.contrib.auth.models import User
from api.models import UserRole

class AdminCreateUserView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        role = request.data.get("role")

        if not all([username, email, password, role]):
            return Response({"error": "Missing fields."}, status=HTTP_400_BAD_REQUEST)

        if role not in dict(UserRole.ROLE_CHOICES).keys():
            return Response({"error": "Invalid role."}, status=HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        UserRole.objects.create(user=user, role=role)
        return Response({"message": "User created successfully."}, status=HTTP_201_CREATED)

###############################################################################################################################################

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from .models import Course
from .serializer import CourseSerializer

class AddCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


###############################################################################################################################################

from rest_framework import generics, permissions
from .models import LearningMaterial
from .serializer import LearningMaterialSerializer

class LearningMaterialListCreateView(generics.ListCreateAPIView):
    queryset = LearningMaterial.objects.all()
    serializer_class = LearningMaterialSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class LearningMaterialRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LearningMaterial.objects.all()
    serializer_class = LearningMaterialSerializer
    permission_classes = [permissions.IsAuthenticated]


from rest_framework import generics, permissions
from .models import Assessment
from .serializer import AssessmentSerializer

class AssessmentListCreateView(generics.ListCreateAPIView):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class AssessmentDetailView(generics.RetrieveAPIView):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer
    permission_classes = [permissions.IsAuthenticated]

class AssessmentUpdateView(generics.UpdateAPIView):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer
    permission_classes = [permissions.IsAuthenticated]

class AssessmentDeleteView(generics.DestroyAPIView):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
from rest_framework import generics, permissions
from .serializer import SolvedAssessmentSerializer


class SolvedAssessmentListCreateAPIView(generics.CreateAPIView):
    serializer_class = SolvedAssessmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


