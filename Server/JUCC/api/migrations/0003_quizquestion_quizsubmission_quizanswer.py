# Generated by Django 5.1.6 on 2025-04-30 12:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_schoolcourse_schoolassessment_schoolmaterial_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuizQuestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_text', models.TextField()),
                ('question_type', models.CharField(choices=[('text', 'Text Answer'), ('mcq', 'Multiple Choice'), ('file', 'File Upload')], max_length=10)),
                ('options', models.JSONField(blank=True, help_text='Only used for MCQ', null=True)),
                ('assessment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='api.schoolassessment')),
            ],
        ),
        migrations.CreateModel(
            name='QuizSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('submitted_at', models.DateTimeField(auto_now_add=True)),
                ('assessment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='submissions', to='api.schoolassessment')),
                ('student', models.ForeignKey(limit_choices_to={'role': 'student'}, on_delete=django.db.models.deletion.CASCADE, to='api.schooluser')),
            ],
            options={
                'unique_together': {('student', 'assessment')},
            },
        ),
        migrations.CreateModel(
            name='QuizAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text_answer', models.TextField(blank=True, null=True)),
                ('file_upload', models.FileField(blank=True, null=True, upload_to='quiz_uploads/')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.quizquestion')),
                ('submission', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='api.quizsubmission')),
            ],
        ),
    ]
