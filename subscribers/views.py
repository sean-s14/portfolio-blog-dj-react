
# Custom
from .serializers import SubscriberSerializer
from .models import Subscriber
# Rest Framework
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
# For Emailing
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def contact(request):

    print(request.data)

    name = request.data.get('name')
    email = request.data.get('email')
    message = request.data.get('message')

    if not email:
        return Response({email: 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    if not message:
        return Response({email: 'Message is required'}, status=status.HTTP_400_BAD_REQUEST)

    print(settings.DEFAULT_FROM_EMAIL)

    msg = Mail(
        from_email=settings.DEFAULT_FROM_EMAIL,
        to_emails=settings.DEFAULT_FROM_EMAIL,
        subject='Customer from Shaun Stocker Portfolio',
        html_content=f"""
        From: {name if name else ''}
        Senders Email: {email}
        {message}
        """
    )
    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        response = sg.send(msg)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return Response('Message Sent!', status=status.HTTP_200_OK)
    except Exception as e:
        print('subscribers/views: Error!')
        print(e)
        print(e.args)
        return Response('Message not sent! Something went wrong. Try again.', status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def unsubscribe(request):
    # print(self)
    print(request.query_params)
    email = request.query_params.get('email')
    conf_num = request.query_params.get('conf_num')
    if email and conf_num:
        try:
            subscriber = Subscriber.objects.get(email=email)
            if subscriber.conf_num == conf_num:
                try:
                    subscriber.delete()
                    return Response(f'{email} has been unsubscribed.', status=status.HTTP_200_OK)
                except Exception as e:
                    print(e)
                    return Response('Unsubscription was unsuccessful. Try again.', status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response('Confirmation number was incorrect.', status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(e)
            return Response(f'Subscriber with email "{email}" could not be found.', status=status.HTTP_404_NOT_FOUND)
    else:
        return Response('Either email or confirmation number were not correct.', status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def confirm_subscription(request):
    '''Updates the users "confirm" field if conf_num and email are correct'''

    # In all of the below responses you must redirect to the home page with information for the alerts
    # You will need to use redirect:
    # from django.shortcuts import redirect
    # return redirect('basename')
    # "basename" will be the name for the url that takes you to the home page
    # This url should be set in config.urls

    if request.query_params.get('_method') == 'PATCH':
        if request.query_params.get('email'):
            param_email = request.query_params.get('email')
            try: 
                subscriber = Subscriber.objects.get(email=param_email)
                
                # Return error if subscriber is already confirmed
                if subscriber.confirmed == True:
                    return Response('You subscription has already been confirmed', status=status.HTTP_400_BAD_REQUEST)

                # Return error if confirmation numbers do not match, otherwise set to true, save and return "200 OK"
                if request.query_params.get('conf_num') == subscriber.conf_num:
                    subscriber.confirmed = True
                    subscriber.save()
                    return Response('You have been subscribed', status=status.HTTP_200_OK)
                else:
                    return Response('Confirmation number is wrong', status=status.HTTP_400_BAD_REQUEST)

            except Exception as e:
                print(e)
    
    return Response(request.query_params, status=status.HTTP_200_OK)


class SubscriberViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subscribers to be viewed or edited.
    """
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    permission_classes = ()
    authentication_classes = ()
