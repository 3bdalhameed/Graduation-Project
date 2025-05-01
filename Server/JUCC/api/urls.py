from django.urls import path
from .views import (
    ChallengeCreateView, ChallengeDetailView, 
    ChallengeListView, ChallengeSubmitView, LoginView, 
    LogoutView, SignUpView, VerifySignUpOTPView,
    ValidateTokenView, HomeView, UsersListView,
    CreateTeamView, JoinTeamView, TeamCheckView, 
    TeamProfile, GetTeamsView, get_csrf_token,
    SolvedChallengesView, GetUserRoleView,
    DeleteChallengeView, ChallengeEditView,
    ScoreboardAPIView, AdminCreateUserView,
    AddCourseView, SolvedChallengeLogsView,
    UserListView, UserProfileView, TeamDetailView,
    AssessmentDetailView, AssessmentListCreateView,
    AssessmentUpdateView, AssessmentDeleteView,
    LearningMaterialListCreateView, 
    LearningMaterialRetrieveUpdateDestroyView,
    SolvedAssessmentListCreateAPIView,
    SchoolSignup, SchoolLoginView,
    SendOTP, VerifyOTP,
    CreateSchoolCourseView,ListMyCoursesView,
    SchoolCourseDetailView,AddMaterialView,
    AddAssessmentView,AddQuizQuestionView,
    GetQuizQuestionsView,SubmitQuizView,
    EnrollStudentInCourseView,ListEnrolledCoursesView,
    
)
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('profile/<str:username>/', UserProfileView.as_view(), name='user-profile'),
    path('teams/<int:pk>/', TeamDetailView.as_view(), name='team-detail'),
    
    
    path('validate-token/', ValidateTokenView.as_view(), name='validate_token'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),    
    path("csrf/", get_csrf_token, name="get_csrf_token"),
    
    
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('users/', UsersListView.as_view(), name='users'),
    path("teams/", GetTeamsView.as_view(), name="create_team"),
    path('verify-signup-otp/', VerifySignUpOTPView.as_view(), name='verify_signup_otp'),
    path('home/', HomeView.as_view(), name='home'),
    
    
    path("teams/create/", CreateTeamView.as_view(), name="create_team"),
    path("teams/join/", JoinTeamView.as_view(), name="join_team"),
    path("teams/check/", TeamCheckView.as_view(), name="team_check"),
    path('teams/<int:team_id>/', TeamProfile.as_view(), name='team_profile'),
    path("scoreboard/", ScoreboardAPIView.as_view(), name="scoreboard"),
    path('challenge/', ChallengeListView.as_view(), name='challenge_list'),
    path('challenge/create/', ChallengeCreateView.as_view(), name='challenge_create'),
    path('challenge/<int:challenge_id>/', ChallengeDetailView.as_view(), name='challenge_detail'),
    path('challenge/<int:challenge_id>/submit/', ChallengeSubmitView.as_view(), name='challenge_submit'),
    path("solved-challenges/", SolvedChallengesView.as_view(), name="solved_challenges"),
    path("solved-challenges/", SolvedChallengeLogsView.as_view(), name="solved_challenges"),
    path("challenge/<int:challenge_id>/delete/", DeleteChallengeView.as_view(), name='challenge_delete'),
    path('challenge/<int:challenge_id>/edit/', ChallengeEditView.as_view(), name='challenge-edit'),
    path("user-role/", GetUserRoleView.as_view(), name="user_role"),
    
    
    path('school/send-otp/', SendOTP.as_view(), name = "school_send_otp"),
    path('school/verify-otp/', VerifyOTP.as_view(), name = "school_verify_otp"),
    path('school/signup/', SchoolSignup.as_view(), name = "school_signup"),
    path('school/login/', SchoolLoginView.as_view(), name = "school_login"),
    path("school/admin/create-user/", AdminCreateUserView.as_view(), name="admin_create_user"),
    path('school/courses/create/', CreateSchoolCourseView.as_view(), name='school-course-create'),
    path('school/courses/', ListMyCoursesView.as_view(), name='school-courses-list'),
    path('school/courses/<int:course_id>/', SchoolCourseDetailView.as_view(), name='school-course-detail'),
    path('school/courses/<int:course_id>/add-material/', AddMaterialView.as_view(), name='school-course-add-material'),
    path('school/courses/<int:course_id>/add-assessment/', AddAssessmentView.as_view(), name='school-course-add-assessment'),
    path('school/assessments/<int:assessment_id>/add-question/', AddQuizQuestionView.as_view(), name='add-quiz-question'),
    path('school/assessments/<int:assessment_id>/quiz/', GetQuizQuestionsView.as_view(), name='get-quiz-questions'),
    path('school/assessments/<int:assessment_id>/submit/', SubmitQuizView.as_view(), name='submit-quiz'),
    path('school/courses/<int:course_id>/enroll/', EnrollStudentInCourseView.as_view(), name='enroll-student'),
    path('school/courses/enrolled/', ListEnrolledCoursesView.as_view(), name='school-enrolled-courses'),

    path('courses/add/', AddCourseView.as_view(), name='add_course'),
    
    
    path("learning-materials/", LearningMaterialListCreateView.as_view(), name="learning-list-create"),
    path("learning-materials/<int:pk>/", LearningMaterialRetrieveUpdateDestroyView.as_view(), name="learning-detail-edit-delete"),
    
    path('assessments/', AssessmentListCreateView.as_view(), name='assessment-list-create'),
    path('assessments/<int:pk>/', AssessmentDetailView.as_view(), name='assessment-detail'),
    path('assessments/<int:pk>/edit/', AssessmentUpdateView.as_view(), name='assessment-update'),
    path('assessments/<int:pk>/delete/', AssessmentDeleteView.as_view(), name='assessment-delete'),
    path("solved-assessments/", SolvedAssessmentListCreateAPIView.as_view(), name="solved-assessments"),
]
