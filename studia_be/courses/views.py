from rest_framework import generics
from .serializers import CourseSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Course

class CourseList(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
 
class CourseCreate(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer