
from django.urls import include, path
from rest_framework import routers
from .views import (
    SubscriberViewSet,
    confirm_subscription,
    unsubscribe,
    contact,
)

router = routers.DefaultRouter()
router.register(r'', SubscriberViewSet)

urlpatterns = [
    path('confirmation/', confirm_subscription, name='confirmation'),
    path('unsubscribe/', unsubscribe, name='unsubscribe'),
    path('contact/', contact, name='contact'),
    path('', include(router.urls)),
]
    