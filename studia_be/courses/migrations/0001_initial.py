# Generated by Django 4.1.2 on 2023-04-12 17:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('course_type', models.TextField()),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('student_count', models.IntegerField(default=0)),
                ('professor', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('students', models.ManyToManyField(related_name='courses', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]