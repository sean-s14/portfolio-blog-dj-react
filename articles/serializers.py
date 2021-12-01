from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True, allow_blank=False, max_length=100)
    slug = serializers.CharField(required=True, allow_blank=False)
    image = serializers.ImageField(allow_empty_file=True, required=False)
    content = serializers.CharField(allow_blank=True)
    date_created = serializers.DateTimeField(read_only=True)
    date_modified = serializers.DateTimeField(read_only=True)
    published = serializers.BooleanField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'image', 'content', 'published']
        lookup_field = 'slug'
    
    def create(self, validated_data):
        print(validated_data)
        return Article.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.image = validated_data.get('image', instance.image)
        instance.content = validated_data.get('content', instance.content)
        instance.date_created = validated_data.get('date_created', instance.date_created)
        instance.date_modified = validated_data.get('date_modified', instance.date_modified)
        instance.published = validated_data.get('published', instance.published)
        instance.save()
        return instance