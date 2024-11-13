from django.urls import path
from .views import login_view, signUp_view

urlpatterns = [
    path("login/", login_view, name="login"),
    path("signup/", signUp_view, name="signup")
    
]
