from django.shortcuts import render

# Create your views here.
# User_Relationship_App/views.py
from rest_framework import viewsets
from .models import Relationship
from .serializers import RelationshipSerializer

class RelationshipViewSet(viewsets.ModelViewSet):
    queryset = Relationship.objects.all()
    serializer_class = RelationshipSerializer

# User_Relationship_App/serializers.py
from rest_framework import serializers
from .models import Relationship

class RelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relationship
        fields = ['id', 'follower', 'followed']
