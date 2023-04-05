from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views

app_name = 'accountprofile'

urlpatterns = [
    path('users/<int:pk>/', views.UserDetail.as_view(),name="user_detail"),
    path('users/', views.UserListAPIView.as_view(), name='user_list'),
    path('users/<int:pk>/courses/', views.UserDetail.CourseList.as_view(), name='user_course_list'),
]

