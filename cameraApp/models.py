from __future__ import unicode_literals

from django.db import models

# Create your models here.

class question(models.Model):
    name = models.CharField(max_length=300, blank=True)
    desc = models.CharField(max_length=300, blank=True)

    def __unicode__(self):
        return self.name