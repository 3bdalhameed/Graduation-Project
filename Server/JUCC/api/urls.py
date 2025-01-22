from django.urls import path
from .views import (
    LoginView, LogoutView, SignUpView, VerifySignUpOTPView,
    ValidateTokenView, ChallengeView, HomeView, UsersListView,
    CreateTeamView, JoinTeamView, TeamCheckView, TeamProfile
)
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('users/', UsersListView.as_view(), name='users'),
    path('verify-signup-otp/', VerifySignUpOTPView.as_view(), name='verify_signup_otp'),
    path('validate-token/', ValidateTokenView.as_view(), name='validate_token'),
    path('challenge/', ChallengeView.as_view(), name='challenge'),
    path('home/', HomeView.as_view(), name='home'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path("teams/create/", CreateTeamView.as_view(), name="create_team"),
    path("teams/join/", JoinTeamView.as_view(), name="join_team"),
    path("teams/check/", TeamCheckView.as_view(), name="team_check"),
    path('teams/<int:team_id>/', TeamProfile.as_view(), name='team_profile'),
]
