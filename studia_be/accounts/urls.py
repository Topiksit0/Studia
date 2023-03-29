from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views

app_name = 'authentication'

urlpatterns = [
    path('users/<int:pk>', views.UserDetail.as_view(),name="user_detail"),
]