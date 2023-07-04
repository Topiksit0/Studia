from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.decorators import api_view
from accounts.models import UserAccount
from accounts.serializers import UserCreateSerializer
from courses.serializers import CourseSerializer
from courses.models import Course
from django.conf import settings
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from itertools import groupby
from datetime import datetime
from django.http import JsonResponse
from rest_framework import viewsets

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


class ActivitiesTimeline(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get(self, request, pk):
        user_id = self.kwargs['pk']
        temp = Course.objects.filter(students__id=user_id)
        client = MongoClient(
            settings.MONGODB_SETTINGS['uri'], server_api=ServerApi('1'))
        db = client['course_activities']
        activities_collection = db['activities']
        activities_by_date = {}
        for course in temp:   
            curso_mongo = activities_collection.find_one({"id": course.id})
            if(curso_mongo is None):
                continue
            for section in curso_mongo['secciones']:
                for subsection in section['subsecciones']:
                    if subsection['finished'] == 'False':
                        for content in subsection['contenido']:
                            if content.get('fecha_fin_entrega') is not None:
                                date = datetime.strptime(
                                    content['fecha_fin_entrega'], '%d-%m-%Y')
                                if date > datetime.now():
                                    title = course.title
                                    tipo = content['tipo']
                                    texto = content['texto']
                                    fecha_fin_entrega = content['fecha_fin_entrega']
                                    if fecha_fin_entrega not in activities_by_date:
                                        activities_by_date[fecha_fin_entrega] = []
                                    activities_by_date[fecha_fin_entrega].append(
                                        {'titulo': title, 'tipo': tipo, 'texto': texto})
        sorted_activities = sorted(activities_by_date.items(
        ), key=lambda x: datetime.strptime(x[0], '%d-%m-%Y'))
        lista_ordenada = [{'fecha_fin_entrega': key, 'actividades': value}
                        for key, value in sorted_activities]
        return Response(lista_ordenada)

class QualificationsStudent(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get(self, request, pk):
        user_id = self.kwargs['pk']
        client = MongoClient(
        settings.MONGODB_SETTINGS['uri'], server_api=ServerApi('1'))
        db = client['course_activities']
        activities_collection = db['grades']
        grades_student = activities_collection.find_one({"alumno_id": str(user_id)})
        return Response(grades_student['notas_por_curso'])
    

class CoursesNews(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get(self, request, pk):
        final_list = []
        user_id = self.kwargs['pk']
        temp = Course.objects.filter(students__id=user_id)
        client = MongoClient(
            settings.MONGODB_SETTINGS['uri'], server_api=ServerApi('1'))
        db = client['course_activities']
        activities_collection = db['activities']

        for course in temp:
            curso_mongo = activities_collection.find_one({"id": course.id})
            if(curso_mongo is None):
                continue
            for post in curso_mongo['posts']:
                final_list.append({ 'title': course.title, 'post': post['msg'],'timestamp': post['timestamp'] ,'professor_name': course.professor.name, 'professor_photo': course.professor.profile_photo})
        lista_ordenada = sorted(final_list, key=lambda x: x['timestamp'], reverse=True)
        return Response(lista_ordenada)
