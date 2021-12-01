from django.urls import include, path
from rest_framework import routers
from .views import (
    ArticleViewSet
)

router = routers.DefaultRouter()
router.register(r'', ArticleViewSet)

urlpatterns = [
    path('', include(router.urls))
]
    