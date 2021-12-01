

from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import check_password
from rest_framework import status
from django.db import IntegrityError
# from rest_framework.response import Response
# from copy import deepcopy


User = get_user_model()

class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'todos')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_username(self, username):
        try:
            match = User.objects.get(username=username)
            error = 'The username you entered already exists'
            if match and (self.instance is not None):
                '''Checks if a different user with the submitted username already exists (for updating)'''
                if match.id is not self.instance.id:
                    raise ValidationError(error, code=status.HTTP_400_BAD_REQUEST)
            elif match:
                '''Checks if a user with the submitted username already exists (for signup)'''
                raise ValidationError(error, code=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            print('Username is unique')

        return username

    def validate_email(self, email):
        try:
            match = User.objects.get(email=email)
            error = 'The email you entered already exists'
            if match and (self.instance is not None):
                if match.id is not self.instance.id:
                    raise ValidationError(error, code=status.HTTP_400_BAD_REQUEST)
            elif match:
                raise ValidationError(error, code=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            print('Email is unique')

        return email

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        
        if password is not None:
            instance.set_password(password)
        try:
            instance.save()
        except IntegrityError as err:
            print('This was tried first...')
            print(err)

        return instance

    def update(self, instance, validated_data):
        password = validated_data.get('password')
        validated = check_password(password=password, encoded=instance.password)
        
        if validated:
            instance.email = validated_data.get('email', instance.email)
            instance.username = validated_data.get('username', instance.username)
        else:
            raise serializers.ValidationError(
                {'password': 'The password you entered was incorrect'},
                code=status.HTTP_400_BAD_REQUEST    
            )

        instance.save()
        
        return instance


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        # Add custom claims
        # token['username'] = user.username
        # token['email'] = user.email
        return token
        