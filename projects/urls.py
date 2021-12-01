from django.urls import include, path
from rest_framework import routers
from .views import (
    ProjectViewSet
)

router = routers.DefaultRouter()
router.register(r'', ProjectViewSet)

urlpatterns = [
    path('', include(router.urls))
]
    