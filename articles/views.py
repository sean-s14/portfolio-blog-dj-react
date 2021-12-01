from .models import Article
from .serializers import ArticleSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.filter(published=True)
    serializer_class = ArticleSerializer
    lookup_field = 'slug'
    pagination_class = StandardResultsSetPagination


    def filter_queryset(self, queryset):
        queryset = super().filter_queryset(queryset)
        if self.request.user.is_superuser:
            queryset = Article.objects.all()
            print('Superuser!')
        else:
            print('Not a superuser...')
        return queryset


    def post(self, request, format=None):
        print(request.data)
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print('Error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)