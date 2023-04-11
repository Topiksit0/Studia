from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from datetime import date
from courses.models import Course
from accounts.models import UserAccount
from django.core.files.uploadedfile import SimpleUploadedFile


class CourseTests(TestCase):

    def setUp(self):
        self.user = UserAccount.objects.create(email='testuser@test.com', password='testpassword', user_name='testuser', name='Test User')
        self.client.force_login(self.user)

    def test_create_course(self):
        url = reverse('courses:course_create')
        data = {
            'title': 'Test Course',
            'description': 'This is a test course',
            'course_type': 'Test',
            'start_date': date.today(),
            'end_date': date.today(),
            'photo': SimpleUploadedFile('studia_fe/src/assets/bg-uni.jpg', b'content'),
        }
        response = self.client.post(url, data, format='json')
        print("respuesat", response)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Course.objects.count(), 1)
        self.assertEqual(Course.objects.get().title, 'Test Course')