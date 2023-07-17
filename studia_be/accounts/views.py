from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.generics import UpdateAPIView
from rest_framework.decorators import api_view
import uuid
from datetime import datetime
from accounts.models import UserAccount
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from accounts.serializers import UserCreateSerializer, UserUpdateSerializer
from courses.serializers import CourseSerializer
from courses.models import Course
import sys
from django.conf import settings
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from itertools import groupby
from datetime import datetime
from django.http import JsonResponse
import os
from rest_framework import viewsets
from azure.storage.blob import BlobServiceClient, BlobType, ContentSettings
from rest_framework.parsers import FileUploadParser


class UserDetail(generics.RetrieveAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializer


class UserListAPIView(generics.ListAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializer

def generate_unique_suffix():
    unique_id = uuid.uuid4().hex[:6]
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    return f"_{timestamp}_{unique_id}"

@csrf_exempt
def upload_image_to_azure(request):
    if request.method == 'POST' and request.FILES.get('image'):
        image_file = request.FILES['image'] 
        try:
            blob_service_client = BlobServiceClient.from_connection_string(os.environ.get('AZURE_CONNECTION_STRING'))
            container_client = blob_service_client.get_container_client('studiaimages')
            blob_name = image_file.name
            if container_client.get_blob_client(blob_name).exists():
                    unique_suffix = generate_unique_suffix()
                    blob_name = f"{os.path.splitext(blob_name)[0]}{unique_suffix}{os.path.splitext(blob_name)[1]}"    
            blob_client = container_client.get_blob_client(blob_name)
            content_type = image_file.content_type
            content_settings = ContentSettings(content_type=content_type)
            blob_client.upload_blob(image_file, content_settings=content_settings)
            
            # URL pública de la imagen cargada
            image_url = f"https://studia.blob.core.windows.net/studiaimages/{blob_name}"
            
            return JsonResponse({'message': 'Imagen cargada exitosamente.', 'image_url': image_url})
        except Exception as e:
            return JsonResponse({'error': 'Ocurrio un error al cargar la imagen.', 'detail': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Se esperaba una solicitud POST con una imagen.'}, status=400)



class UserUpdate(UpdateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserUpdateSerializer
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        user = UserAccount.objects.get(pk=kwargs['pk'])
        username = request.data.get('user_name', '').lower()
        if not request.data or all(value == '' for value in request.data.values()):
            return Response("No update values provided.", status=status.HTTP_400_BAD_REQUEST)
        for i in UserAccount.objects.all():
            if i.user_name.lower() == username and i.id != user.id:
                return Response("Username already exists.", status=status.HTTP_400_BAD_REQUEST)
        user.name = request.data.get('name', user.name)
        user.description = request.data.get('description', user.description)
        user.university = request.data.get('university', user.university)
        user.user_name = request.data.get('user_name', user.user_name)

        if(request.data.get('profile_photo', user.profile_photo) != '' and request.data.get('profile_photo', user.profile_photo) != None):
            user.profile_photo = request.data.get(
                'profile_photo', user.profile_photo)
        if(request.data.get('landscape_photo', user.landscape_photo) != '' and request.data.get('landscape_photo', user.landscape_photo) != None):
            user.landscape_photo = request.data.get(
                'landscape_photo', user.landscape_photo)
            
        user.save()
        return HttpResponse(user, status=status.HTTP_200_OK)


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
            if (curso_mongo is None):
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
                                        activities_by_date[fecha_fin_entrega] = [
                                        ]
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
        grades_student = activities_collection.find_one(
            {"alumno_id": str(user_id)})
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
            if (curso_mongo is None):
                continue
            for post in curso_mongo['posts']:
                final_list.append({'title': course.title, 'post': post['msg'], 'timestamp': post['timestamp'],
                                  'professor_name': course.professor.name, 'professor_photo': course.professor.profile_photo})
        lista_ordenada = sorted(
            final_list, key=lambda x: x['timestamp'], reverse=True)
        return Response(lista_ordenada)
