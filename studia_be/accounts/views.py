from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.decorators import api_view
from accounts.models import UserAccount
from accounts.serializers import UserCreateSerializer
from courses.serializers import CourseSerializer
from courses.models import Course

# Create your views here.

class UserDetail(generics.RetrieveAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializer

class UserListAPIView(generics.ListAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializer
    
class CourseList(generics.ListAPIView):
    serializer_class = CourseSerializer
    
    def get_queryset(self):
        user_id = self.kwargs['pk']
        return Course.objects.filter(students__id=user_id)