from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView



urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/accounts/', include('accounts.urls', namespace='accountprofile')),
    path('api/courses/', include('courses.urls', namespace='courses')),
]


urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
