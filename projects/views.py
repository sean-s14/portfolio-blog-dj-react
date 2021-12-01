from .models import Project
from .serializers import ProjectSerializer
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class ProjectViewSet(viewsets.ModelViewSet, PageNumberPagination):
    queryset = Project.objects.filter(published=True)
    serializer_class = ProjectSerializer
    lookup_field = 'slug'
    pagination_class = StandardResultsSetPagination


    def filter_queryset(self, queryset):
        queryset = super().filter_queryset(queryset)
        if self.request.user.is_superuser:
            queryset = Project.objects.all()
            print('Superuser!')
        else:
            print('Not a superuser...')
        return queryset

