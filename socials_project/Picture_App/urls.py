from django.urls import path
from .views import PictureListCreate, PictureLike

urlpatterns = [
    path('pictures/', PictureListCreate.as_view(), name='picture-list-create'),
    path('like/<int:pk>/', PictureLike.as_view(), name='picture-like'),
]
