from rest_framework import generics, status
from .serializers import CourseSerializer
from rest_framework.views import APIView
from accounts.models import UserAccount
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import Course

class CourseList(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
 
class CourseCreate(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class AddStudentToCourse(APIView):
    permission_classes = [IsAuthenticated]

    def update_student_count(self):
        self.student_count = self.students.count()
        self.save()

    def post(self, request, course_id, user_id):
        try:
            course = Course.objects.get(id=course_id)
            student = UserAccount.objects.get(id=user_id)
            course.students.add(student)
            course.save()
            self.update_student_count()
            return Response({"message": "Student added to the course successfully"}, status=status.HTTP_200_OK)
        except Course.DoesNotExist:
            return Response({"message": "Course not found"}, status=status.HTTP_404_NOT_FOUND)
        except UserAccount.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)