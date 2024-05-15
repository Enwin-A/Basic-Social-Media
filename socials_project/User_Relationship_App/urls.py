# User_Relationship_App/urls.py
from django.urls import path, include
from rest_framework import routers
from .views import RelationshipViewSet

# Define a router
router = routers.DefaultRouter()
router.register(r'relationships', RelationshipViewSet)

# URLs for the User_Relationship_App
urlpatterns = [
    path('', include(router.urls)),
]

