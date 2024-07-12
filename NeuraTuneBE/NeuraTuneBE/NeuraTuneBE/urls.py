"""
URL configuration for NeuraTuneBE project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import path
from backend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/classify', views.predict_genre, name='file-upload'),
    path('api/billboard-top-songs/', views.BillboardTopSongsView.as_view(), name='billboard_top_songs'),
    path('api/register/', views.register_view, name='register'),
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    path('api/check_auth_status/', views.check_auth_status, name='check_auth_status'),
    path('api/csrf_token/', views.csrf_token_view, name='csrf_token'),
    path('api/latest-analysis/', views.get_latest_analysis),
]
