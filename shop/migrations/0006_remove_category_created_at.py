# Generated by Django 2.0.13 on 2019-04-09 00:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_category_created_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='created_at',
        ),
    ]