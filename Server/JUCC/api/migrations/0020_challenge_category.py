# Generated by Django 5.1.4 on 2025-03-16 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_alter_challenge_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='challenge',
            name='category',
            field=models.CharField(default='Web', max_length=255),
        ),
    ]
