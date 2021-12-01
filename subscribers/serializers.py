
from .models import Subscriber
from rest_framework import serializers
from rest_framework import status
from rest_framework.exceptions import ValidationError


class SubscriberSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    confirmed = serializers.BooleanField(default=False)
    conf_num = serializers.CharField(required=False, write_only=True)

    class Meta:
        model = Subscriber
        fields = ('email', 'confirmed', 'conf_num')
        extra_kwargs = {
            'conf_num': {'read_only': True},
        }


    
    def validate_email(self, email):
        try:
            match = Subscriber.objects.get(email=email)
            error = 'The email you entered already exists'
            if match and (self.instance is not None):
                if match.id is not self.instance.id:
                    raise ValidationError(error, code=status.HTTP_400_BAD_REQUEST)
            elif match:
                raise ValidationError(error, code=status.HTTP_400_BAD_REQUEST)

        except Subscriber.DoesNotExist:
            print('subsribers/serializers: Email is unique')

        return email
    