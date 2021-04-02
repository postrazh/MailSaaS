# Generated by Django 3.1.4 on 2021-03-29 23:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mailaccounts', '0012_auto_20210326_0916'),
        ('campaign', '0013_sendingobject_email_order'),
    ]

    operations = [
        migrations.CreateModel(
            name='EmailInbox',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_email', models.CharField(max_length=50)),
                ('email_subject', models.CharField(max_length=100)),
                ('email_body', models.TextField(blank=True, null=True)),
                ('status', models.PositiveSmallIntegerField(default=0)),
                ('receive_date', models.DateField(blank=True, null=True)),
                ('receive_time', models.TimeField(blank=True, null=True)),
                ('recipient_email', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mailaccounts.emailaccount')),
            ],
        ),
    ]
