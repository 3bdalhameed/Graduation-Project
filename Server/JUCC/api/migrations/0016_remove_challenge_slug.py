# Generated by Django 5.1.7 on 2025-03-16 08:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_auto_20250315_1624'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='challenge',
            name='slug',
        ),
    ]
