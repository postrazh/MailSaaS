# Generated by Django 3.1.4 on 2021-02-11 05:00

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
            name='EmailAccount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('full_name', models.CharField(max_length=200)),
                ('smtp_host', models.CharField(blank=True, max_length=200, null=True)),
                ('smtp_username', models.CharField(blank=True, max_length=200, null=True)),
                ('smtp_password', models.CharField(blank=True, max_length=200, null=True)),
                ('smtp_port', models.CharField(blank=True, choices=[('587', '587'), ('25', '25'), ('465', '465'), ('2525', '2525')], default='587', max_length=20, null=True)),
                ('imap_host', models.CharField(blank=True, max_length=200, null=True)),
                ('imap_username', models.CharField(blank=True, max_length=200, null=True)),
                ('imap_password', models.CharField(blank=True, max_length=200, null=True)),
                ('imap_port', models.CharField(blank=True, choices=[('993', '993'), ('143', '143'), ('995', '995')], default='993', max_length=20, null=True)),
                ('access_token', models.CharField(blank=True, max_length=500, null=True)),
                ('provider', models.CharField(blank=True, choices=[('smtp', 'Smtp'), ('google', 'Google'), ('microsoft', 'Microsoft')], default='Smtp', max_length=100, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
