# Generated by Django 5.1.4 on 2025-03-15 12:27

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_remove_challenge_created_at_challenge_description_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameField(
            model_name='challenge',
            old_name='category',
            new_name='title',
        ),
        migrations.RemoveField(
            model_name='challenge',
            name='creator',
        ),
        migrations.RemoveField(
            model_name='challenge',
            name='difficulty',
        ),
        migrations.RemoveField(
            model_name='challenge',
            name='name',
        ),
        migrations.RemoveField(
            model_name='challenge',
            name='point',
        ),
        migrations.RemoveField(
            model_name='challenge',
            name='subcategory',
        ),
        migrations.AddField(
            model_name='challenge',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='challenge',
            name='created_by',
            field=models.ForeignKey(default=django.utils.timezone.now, on_delete=django.db.models.deletion.CASCADE, related_name='challenges', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='challenge',
            name='points',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='challenge',
            name='slug',
            field=models.SlugField(blank=True, unique=True),
        ),
        migrations.AlterField(
            model_name='challenge',
            name='description',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='challenge',
            name='flag',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.DeleteModel(
            name='SolvedChallenges',
        ),
    ]
