
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


from django.contrib.auth.forms import UserCreationForm
class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields = ('username', 'email', )


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff')
    list_display_links = ('email', 'username')

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', ),
        }),
    )
        