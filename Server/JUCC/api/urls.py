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
    ProfileView, 
)
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('users/', UsersListView.as_view(), name='users'),
    path("teams/", GetTeamsView.as_view(), name="create_team"),
    path('verify-signup-otp/', VerifySignUpOTPView.as_view(), name='verify_signup_otp'),
    path('validate-token/', ValidateTokenView.as_view(), name='validate_token'),
    path('home/', HomeView.as_view(), name='home'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path("teams/create/", CreateTeamView.as_view(), name="create_team"),
    path("teams/join/", JoinTeamView.as_view(), name="join_team"),
    path("teams/check/", TeamCheckView.as_view(), name="team_check"),
    path('teams/<int:team_id>/', TeamProfile.as_view(), name='team_profile'),
    path("scoreboard/", ScoreboardAPIView.as_view(), name="scoreboard"),
    path("csrf/", get_csrf_token, name="get_csrf_token"),
    path('challenge/', ChallengeListView.as_view(), name='challenge_list'),
    path('challenge/create/', ChallengeCreateView.as_view(), name='challenge_create'),
    path('challenge/<int:challenge_id>/', ChallengeDetailView.as_view(), name='challenge_detail'),
    path('challenge/<int:challenge_id>/submit/', ChallengeSubmitView.as_view(), name='challenge_submit'),
    path("solved-challenges/", SolvedChallengesView.as_view(), name="solved_challenges"),
    path("solved-challenges/", SolvedChallengeLogsView.as_view(), name="solved_challenges"),
    path("challenge/<int:challenge_id>/delete/", DeleteChallengeView.as_view(), name='challenge_delete'),
    path('challenge/<int:challenge_id>/edit/', ChallengeEditView.as_view(), name='challenge-edit'),
    path("user-role/", GetUserRoleView.as_view(), name="user_role"),
    
    
    path("school/admin/create-user/", AdminCreateUserView.as_view(), name="admin_create_user"),
    path('courses/add/', AddCourseView.as_view(), name='add_course'),
]
