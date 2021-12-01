from django.contrib import admin
from .models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'date_created', 'date_modified', 'published')
    list_display_links = ('title', 'slug',)
    prepopulated_fields = {'slug': ('title', )}