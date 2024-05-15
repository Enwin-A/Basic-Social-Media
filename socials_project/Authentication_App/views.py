from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer

class UserRegistrationView(APIView):
    def post(self, request):
        print(request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = User.objects.filter(username=username).first()
        print(user)
        print(password)
        print(user.check_password(password))
        print(user.id)
        password_matches = user.password
        if(password == password_matches):
            password_check = True #as the user.check_password(password) works with hashing
        if user and password_check:
            # Return user data or token for authentication
            return Response({'message': 'Login successful!','user_id': user.id}, status=status.HTTP_200_OK)
        else:

            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
