from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.decorators import api_view
from accounts.models import UserAccount
from accounts.serializers import UserCreateSerializer

# Create your views here.

class UserDetail(generics.RetrieveAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializer()