
from django.urls import include, path
from rest_framework import routers
from .views import (
    UserViewSet,
    ObtainTokenPairWithEmailView,
    CustomUserCreate,
    LogoutAndBlacklistRefreshTokenForUserView
)
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', ObtainTokenPairWithEmailView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
    path('', include(router.urls)),
]
        