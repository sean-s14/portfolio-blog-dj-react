
from django.db import models
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

import random
def conf_num_generator():
    return "%0.12d" % random.randint(0, 999999999999)

class Subscriber(models.Model):
    email       = models.EmailField     (unique=True, blank=False, null=False)
    join_date   = models.DateTimeField  (auto_now_add=True)
    conf_num    = models.CharField      (max_length=15)
    confirmed   = models.BooleanField   (default=False)

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        # Only sends confirmation email upon creation
        try:
            subscriber = Subscriber.objects.get(email=self.email)
            print('Email Already exists: No email sent')
            super().save(*args, **kwargs)

        except Subscriber.DoesNotExist:
            print('Email Does not yet exist: Sending email')
            self.conf_num = conf_num_generator()
            super().save(*args, **kwargs)

            message = Mail(
                from_email=settings.DEFAULT_FROM_EMAIL,
                to_emails=self.email,
                subject='Subscription Confirmation',
                html_content=f"""
                <strong>Subscription confirmation for Shaun Stocker's Blog</strong><br>
                Click <a href="https://shaun-stocker.herokuapp.com/subscribers/confirmation/?email={self.email}&conf_num={self.conf_num}&_method=PATCH">here</a> to confirm your subscription.
                """
            )
            try:
                # sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
                sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
                response = sg.send(message)
                print(response.status_code)
                print(response.body)
                print(response.headers)
            except Exception as e:
                print('subscribers/models: Error!')
                print(e)
                print(e.args)

            print('subscribers/models: Success')
    