# Generated by Django 5.1.6 on 2025-05-01 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_schoolenrollment'),
    ]

    operations = [
        migrations.AddField(
            model_name='quizquestion',
            name='correct_answer',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='quizquestion',
            name='options',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
