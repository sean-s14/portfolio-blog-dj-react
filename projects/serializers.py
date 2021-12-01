from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True, allow_blank=False, max_length=100)
    slug = serializers.CharField(required=True, allow_blank=False)
    link = serializers.CharField(required=True, allow_blank=False, max_length=200)
    image = serializers.ImageField(allow_empty_file=True, required=False)
    description = serializers.CharField(required=True, allow_blank=False)
    date_created = serializers.DateTimeField(read_only=True)
    date_modified = serializers.DateTimeField(read_only=True)
    published = serializers.BooleanField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'link', 'image', 'description', 'published']
    
    def create(self, validated_data):
        return Project.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.link = validated_data.get('link', instance.link)
        instance.image = validated_data.get('image', instance.image)
        instance.description = validated_data.get('description', instance.description)
        instance.date_created = validated_data.get('date_created', instance.date_created)
        instance.date_modified = validated_data.get('date_modified', instance.date_modified)
        instance.published = validated_data.get('published', instance.published)

        instance.save()
        return instance
    