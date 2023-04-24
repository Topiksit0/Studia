from rest_framework import generics, status
from .serializers import CourseSerializer
from rest_framework.views import APIView
from pymongo import MongoClient
from accounts.models import UserAccount
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from pymongo.errors import ConnectionFailure
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from .models import Course
import json

from django.conf import settings


class CourseList(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CourseDetail(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class ActivitiesDetail(APIView):
    def procesar_objeto(self, objeto):
        lista_secciones = []
        
        for seccion in objeto['section_titles']:
            lista_subsecciones = []
            
            for subseccion in seccion['subsecciones']:
                lista_actividades = []
                
                for actividad in subseccion['contenido']['actividades']:
                   
                    lista_actividades.append({'tipo': actividad['tipo'], 'descripcion': actividad['descripcion']})
                
                lista_subsecciones.append({'titulo': subseccion['titulo'],'fase': subseccion['fase'] ,'contenido': {'texto': subseccion['contenido']['texto'], 'actividades': lista_actividades}})
            
            lista_secciones.append({'titulo': seccion['titulo'], 'subsecciones': lista_subsecciones})
        
        return lista_secciones
    
    def get(self, request, pk):
        client = MongoClient(settings.MONGODB_SETTINGS['uri'], server_api=ServerApi('1'))      

        db = client['course_activities'] 
        activities_collection = db['activities']   
        activity = activities_collection.find_one( {"id": pk} )

        if activity is None:
            return Response(status=404)

        response_data = {
            'section_titles': activity['secciones']
        }
        sections_list = self.procesar_objeto(response_data)       
        return Response(sections_list)
 
class CourseCreate(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class AddStudentToCourse(APIView):
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
        
