from django.db import models
from accounts.models import UserAccount



class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    course_type = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    students = models.ManyToManyField(UserAccount, related_name='courses')

