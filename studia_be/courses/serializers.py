from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    students = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description','course_type' ,'start_date', 'end_date', 'students']