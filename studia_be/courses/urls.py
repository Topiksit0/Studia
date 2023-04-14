from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views

app_name = 'courses'

urlpatterns = [
    path('', views.CourseList.as_view(), name='course_list'),
    path('create/', views.CourseCreate.as_view(), name='course_create'),
]