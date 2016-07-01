from __future__ import unicode_literals

from django.db import models
import os

def get_image_path(instance, filename):
    return os.path.join('photos', str(instance.id), filename)

class Event(models.Model):
	title = models.CharField(max_length=100)
	description = models.TextField()
	local = models.CharField(max_length=100)
	address = models.CharField(max_length=255)
	geolocation = models.CharField(max_length=100)
	date = models.DateTimeField()
	banner = models.FileField(upload_to='documents/%Y/%m/%d')
	class Meta:
		ordering = ('date',)