from django.urls import path
from .views import LoginView, SignUpView, ChallengeView, VerifySignUpOTPView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("signup/", SignUpView.as_view(), name="signup"),
    path("challenge/", ChallengeView.as_view(), name="challege"),
    path("verify/", VerifySignUpOTPView.as_view(), name="verify"),
    
]
