# Generated by Django 3.1.4 on 2021-02-11 05:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UnsubcribeCsv',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unscribe_emails', models.FileField(blank=True, null=True, upload_to='unsubcribe_csv_uploads/')),
            ],
        ),
        migrations.CreateModel(
            name='UnsubscribeEmail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, verbose_name='Email Account')),
                ('mail_account', models.CharField(blank=True, max_length=100)),
                ('name', models.CharField(blank=True, max_length=100)),
                ('date', models.DateTimeField(auto_now=True)),
                ('on_delete', models.BooleanField(default=False)),
            ],
        ),
    ]
