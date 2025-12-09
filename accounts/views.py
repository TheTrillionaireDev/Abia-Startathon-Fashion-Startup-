from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth import logout

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'username': user.username})

class LogoutView(APIView):
    def post(self, request):
        # delete token to logout
        if request.auth:
            request.auth.delete()
        logout(request)
        return Response(status=status.HTTP_200_OK)

# Example protected view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({'message': f'Hello, {request.user.username}! This is protected.'})
