# Generated by Django 3.1.4 on 2021-04-16 23:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teams', '0003_team_bcc_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invitation',
            name='role',
        ),
        migrations.AddField(
            model_name='invitation',
            name='permission',
            field=models.CharField(choices=[('read', 'Read Campaign'), ('create', 'Create Campaign'), ('update', 'Update Campaign')], default='read', max_length=100),
        ),
    ]