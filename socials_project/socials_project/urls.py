"""socials_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from Picture_App.views import PictureListCreate, PictureLike
from User_Relationship_App.views import RelationshipViewSet
from Authentication_App.views import UserRegistrationView, UserLoginView
from django.views.generic import TemplateView
from django.shortcuts import redirect
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'relationships', RelationshipViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('Authentication_App.urls')),  # Include Authentication_App URLs
    path('api/', include(router.urls)),  # Include User_Relationship_App URLs
    path('api/pictures/', PictureListCreate.as_view(), name='picture-list-create'),  # Include PictureListCreate view
    path('api/pictures/<int:pk>/like/', PictureLike.as_view(), name='picture-like'),  # Include PictureLike view
    path('', lambda request: redirect('static/index.html'), name='index_redirect'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)