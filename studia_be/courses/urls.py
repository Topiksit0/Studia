from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views

app_name = 'courses'

urlpatterns = [
    path('', views.CourseList.as_view(), name='course_list'),
    path('create/', views.CourseCreate.as_view(), name='course_create'),
    path('<int:pk>/add_student/<int:user_id>/', views.AddStudentToCourse.as_view(), name='add-student-to-course'),
    path('<int:pk>/', views.CourseDetail.as_view(), name='course-detail'),
    path('<int:pk>/activities/', views.ActivitiesDetail.as_view(), name='activities-detail'),
    path('<int:pk>/news', views.NewsDetail.as_view(), name='news-detail')

]