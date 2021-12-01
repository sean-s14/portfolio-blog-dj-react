from django.db import models
from django.utils.translation import gettext_lazy as _


def upload_to(instance, filename):
    return 'projects/{filename}'.format(filename=filename)


class Project(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    link = models.URLField(max_length=200)
    image = models.ImageField(_("Image"), upload_to=upload_to, default='images/default.png')
    description = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    published = models.BooleanField(blank=True, default=False)


    class Meta:
        ordering = ['-date_created']

    def __str__(self):
        return self.title
