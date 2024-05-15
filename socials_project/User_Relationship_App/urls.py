# User_Relationship_App/urls.py
from django.urls import path, include
from rest_framework import routers
from .views import RelationshipViewSet
from .views import FollowUserView, UnfollowUserView

# Define a router
router = routers.DefaultRouter()
router.register(r'relationships', RelationshipViewSet)

# URLs for the User_Relationship_App
urlpatterns = [
    path('', include(router.urls)),
    path('follow/<int:user_id>/', FollowUserView.as_view(), name='follow-user'),
    path('unfollow/<int:user_id>/', UnfollowUserView.as_view(), name='unfollow-user'),
]

