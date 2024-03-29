from django.db import models
from accounts.models import UserAccount



class Course(models.Model):
    title = models.CharField(max_length=255)
    course_photo = models.URLField(blank=True, null=True)
    description = models.TextField()
    course_type = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    professor = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    students = models.ManyToManyField(UserAccount, related_name='courses')
    student_count = models.IntegerField(default=0)

