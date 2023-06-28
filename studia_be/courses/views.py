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


class NewsDetail(APIView):
    def get(self, request, pk):
        client = MongoClient(
            settings.MONGODB_SETTINGS['uri'], server_api=ServerApi('1'))

        db = client['course_activities']
        activities_collection = db['activities']
        activity = activities_collection.find_one({"id": pk})

        if activity is None:
            return Response(status=404)

        response_data = {
            'news': activity['posts'],
            'course_id': activity['id']
        }
        return Response(response_data)


class ActivitiesDetail(APIView):
    def procesar_objeto(self, objeto):
        lista_secciones = []

        for seccion in objeto['section_titles']:
            lista_subsecciones = []

            for subseccion in seccion['subsecciones']:
                lista_contenido = []

                for actividad in subseccion['contenido']:

                    if actividad['tipo'] == "texto":
                        lista_contenido.append(
                            {'tipo': actividad['tipo'], 'texto': actividad['texto']})
                        
                    if actividad['tipo'] == "entrega":
                        lista_contenido.append(
                            {'tipo': actividad['tipo'], 'texto': actividad['texto'], 'fecha_fin_entrega': actividad['fecha_fin_entrega'], 'completed':actividad['completed'], 'evaluated':actividad['evaluated']}) 

                    if actividad['tipo'] == "lecture":
                        lista_contenido.append(
                            {'tipo': actividad['tipo'], 'texto': actividad['texto'], 'url': actividad['url'], 'completed':actividad['completed']})

                    if actividad['tipo'] == "cuestionario":
                        lista_contenido.append(
                            {'tipo': actividad['tipo'], 'texto': actividad['texto'], 'htmlcode': actividad['htmlcode']})

                    if actividad['tipo'] == "archivos":
                        lista_contenido.append(
                            {'tipo': actividad['tipo'], 'texto': actividad['texto']})

                    if actividad['tipo'] == "peer_review":
                        lista_contenido.append(
                            {'tipo': actividad['tipo'], 'texto': actividad['texto'], 'peer_id': actividad['peer_id'], 'fecha_fin_entrega': actividad['fecha_fin_entrega'], 'completed':actividad['completed'], 'evaluated':actividad['evaluated']})

                lista_subsecciones.append(
                    {'titulo': subseccion['titulo'], 'fase': subseccion['fase'], 'finished': subseccion['finished'], 'fecha_inicio': subseccion['fecha_inicio'], 'fecha_fin': subseccion['fecha_fin'],  'duracion': subseccion['duracion'], 'contenido': lista_contenido})

            lista_secciones.append(
                {'titulo': seccion['titulo'], 'subsecciones': lista_subsecciones})

        return lista_secciones

    def get(self, request, pk):
        client = MongoClient(
            settings.MONGODB_SETTINGS['uri'], server_api=ServerApi('1'))

        db = client['course_activities']
        activities_collection = db['activities']
        activity = activities_collection.find_one({"id": pk})

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
