from django.shortcuts import render

# Create your views here.
# User_Relationship_App/views.py
from rest_framework import viewsets
from .models import Relationship
from .serializers import RelationshipSerializer
# User_Relationship_App/serializers.py
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from Authentication_App.models import User 
from Authentication_App.serializers import UserSerializer 
from django.shortcuts import get_object_or_404

class RelationshipViewSet(viewsets.ModelViewSet):
    queryset = Relationship.objects.all()
    serializer_class = RelationshipSerializer



class RelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relationship
        fields = ['id', 'follower', 'followed']


class AllUsersView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class FollowedUsersView(APIView):
    def get(self, request):
        user = request.user  
        followed_users = user.following.all()
        serializer = UserSerializer(followed_users, many=True)
        return Response(serializer.data)

import logging


logger = logging.getLogger(__name__)

class FollowUserView(APIView):
    print("FollowUserView: PATCH request received.")
    def patch(self, request, user_id):
        logger.debug("FollowUserView: PATCH request received.")
        user = User.objects.filter(id=user_id).first()
        print(user)
        follower = request.user  
        followed_user = get_object_or_404(User, pk=user_id)
        try:
            # Check if the relationship already exists
            if Relationship.objects.filter(follower=follower, followed=followed_user).exists():
                return Response({"message": "You are already following this user."}, status=status.HTTP_400_BAD_REQUEST)
            # Create the relationship
            Relationship.objects.create(follower=follower, followed=followed_user)
            return Response({"message": "You are now following this user."}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.exception("FollowUserView: An error occurred while processing the request.")
            return Response({"message": "An error occurred while processing the request."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UnfollowUserView(APIView):
    def patch(self, request, user_id):
        logger.debug("UnfollowUserView: PATCH request received.")
        follower = request.user  
        followed_user = get_object_or_404(User, pk=user_id)
        try:
            # Check if the relationship exists
            relationship = Relationship.objects.filter(follower=follower, followed=followed_user).first()
            if not relationship:
                return Response({"message": "You are not following this user."}, status=status.HTTP_400_BAD_REQUEST)
            # Delete the relationship
            relationship.delete()
            return Response({"message": "You have unfollowed this user."}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.exception("UnfollowUserView: An error occurred while processing the request.")
            return Response({"message": "An error occurred while processing the request."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
