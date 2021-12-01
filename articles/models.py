from django.db import models
from tinymce import models as tinymce_models
from django.template.defaultfilters import default, slugify
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, To, Personalization
from subscribers.models import Subscriber


def upload_to(instance, filename):
    return 'articles/{filename}'.format(filename=filename)


class Article(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    image = models.ImageField(_("Image"), upload_to=upload_to, default='images/default.png')
    content = tinymce_models.HTMLField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    published = models.BooleanField(blank=True, default=False)


    class Meta:
        ordering = ['-date_created']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        if self.published:
            
            article = self
            subscribers = Subscriber.objects.filter(confirmed=True)

            messages = [
                Mail(
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to_emails=sub.email,
                    subject=f"{article.title}",
                    html_content=f"""
                    {article.content[0:100]}...
                    <p style='width: 100%; text-align: center;'>See full article <a href='https://shaun-stocker.herokuapp.com/blog/detail/{article.slug}/'>here!</a></p>
                    <p>To stop receiving these emails simply 
                <a href='https://shaun-stocker.herokuapp.com/subscribers/unsubscribe/?email={sub.email}&conf_num={sub.conf_num}'>unsubscribe here</a></p>
                    """,
                )
                for sub in subscribers
            ]

            # emails = [ sub.email for sub in subscribers ]

            # message = Mail(
            #     from_email=settings.DEFAULT_FROM_EMAIL,
            #     to_emails=emails,
            #     subject=f"{article.title}",
            #     html_content=f"""
            #     {article.content[0:100]}...
            #     <p style='width: 100%; text-align: center;'>See full article <a href='https://shaun-stocker.herokuapp.com/blog/detail/{article.slug}/'>here!</a></p>
            #     <p>To stop receiving these emails just 
            # <a href='https://shaun-stocker.herokuapp.com/subscribers/unsubscribe/?email={'email'}&conf_num={'conf_num'}'>unsubscribe here</a></p>
            #     """,
            #     is_multiple=True
            # )
            try:
                sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
                for msg in messages:
                    response = sg.send(msg)
                    print(response.status_code)
                    print(response.body)
                    print(response.headers)

                # response = sg.send(message)
                # print(response.status_code)
                # print(response.body)
                # print(response.headers)
            except Exception as e:
                print('articles/models: Error!')
                print(e)
                print(e.args)

            print('articles/models: Success')
