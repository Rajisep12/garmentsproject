from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from rest_framework.permissions import BasePermission
import logging

from App.models import TblUser

logger = logging.getLogger(__name__)

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_staff)


@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Please provide both username and password"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(email=username, password=password)

    if user is None:
        return Response(
            {"error": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    login(request, user)

    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "message": "Login successful",
            "user_id": user.id,                     
            "username": user.full_name,
            "refresh_token": str(refresh),
            "access_token": str(refresh.access_token),
        },
        status=status.HTTP_200_OK
    )



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):

    refresh_token = request.data.get("refresh_token")

    if not refresh_token:
        return Response(
            {"detail": "Refresh token is required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(
            {"detail": "Successfully logged out."},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {"detail": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
