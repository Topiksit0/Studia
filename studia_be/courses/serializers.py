from rest_framework import serializers
from accounts.serializers import UserCreateSerializer
from .models import Course, UserAccount

class CourseSerializer(serializers.ModelSerializer):
    students = UserCreateSerializer(many=True, read_only=True)
    professor = UserCreateSerializer()
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description','course_type' ,'start_date', 'end_date','professor', 'students', 'course_photo']