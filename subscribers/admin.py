
from django.contrib import admin
from .models import Subscriber


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'join_date', 'confirmed', )
    list_display_links = ('email',)
    