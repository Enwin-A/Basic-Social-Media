from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Picture
from .serializers import PictureSerializer

class PictureListCreate(generics.ListCreateAPIView):
    queryset = Picture.objects.all().order_by('-uploaded_at')
    serializer_class = PictureSerializer

class PictureLike(generics.UpdateAPIView):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer

    def perform_update(self, serializer):
        instance = serializer.save()
        instance.likes += 1
        instance.save()
