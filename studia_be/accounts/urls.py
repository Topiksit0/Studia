from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from rest_framework.routers import SimpleRouter
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework.documentation import include_docs_urls
from . import views

app_name = 'accountprofile'

urlpatterns = [
    path('users/<int:pk>/', views.UserDetail.as_view(), name="user_detail"),
    path('users/<int:pk>/update/', views.UserUpdate.as_view(), name="user_update"),
    path('users/', views.UserListAPIView.as_view(), name='user_list'),
    path('users/<int:pk>/courses/',
         views.CourseList.as_view(), name='user_course_list'),
    path('users/<int:pk>/courses/timeline/',
         views.ActivitiesTimeline.as_view(), name='timeline_course_list'),
    path('users/<int:pk>/qualifications/',
         views.QualificationsStudent.as_view(), name='qualifications_student'),
    path('users/<int:pk>/courses/news/',
         views.CoursesNews.as_view(), name='courses_news'),
    path('users/upload_image/', views.upload_image_to_azure, name='upload_image'),
    path('users/<int:pk>/change-password/', views.ChangePasswordView.as_view(), name='change-password'),
]
