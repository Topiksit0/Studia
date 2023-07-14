from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = '__all__'

class UserUpdateSerializer(UserCreateSerializer):
    name = serializers.CharField(required=False)
    username = serializers.CharField(required=False)

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['description', 'university', 'username', 'name', 'landscape_photo', 'profile_photo']
