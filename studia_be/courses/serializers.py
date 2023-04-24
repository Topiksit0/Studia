from rest_framework import serializers
from .models import Course, UserAccount

class CourseSerializer(serializers.ModelSerializer):
    students = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    professor = serializers.StringRelatedField(source='professor.name')
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description','course_type' ,'start_date', 'end_date','professor', 'students']