from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import SchoolUser  # This points to your custom user model

class SchoolUserJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        user_id = validated_token.get("user_id") or validated_token.get("sub")
        if user_id is None:
            return None

        try:
            return SchoolUser.objects.get(id=user_id)
        except SchoolUser.DoesNotExist:
            return None
