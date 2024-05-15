from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Picture
from .serializers import PictureSerializer
from rest_framework.permissions import IsAuthenticated

class PictureListCreate(generics.ListCreateAPIView):
    print("PictureListCreate")  
    queryset = Picture.objects.all().order_by('-uploaded_at')
    print(queryset)
    serializer_class = PictureSerializer

    def perform_create(self, serializer):
        # Extract user_id from request data
        user_id = self.request.data.get('user_id')
        # Associate user_id with the picture being created
        serializer.save(user_id=user_id)

class PictureLike(generics.UpdateAPIView):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer

    def perform_update(self, serializer):
        instance = serializer.save()
        instance.likes += 1
        instance.save()

