# User_Relationship_App/serializers.py
from rest_framework import serializers
from .models import Relationship

class RelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relationship
        fields = ['id', 'follower', 'followed']
