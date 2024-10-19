from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order
from .email_service import EmailService

@receiver(post_save, sender=Order)
def send_order_status_email(sender, instance, **kwargs):
    email_service = EmailService()

    if kwargs.get('created', False):
        result = email_service.send_order_created_email(
            to_email=instance.customer_email,
            order_id=instance.pk
        )
    else:
        result = email_service.send_order_status_updated_email(
            to_email=instance.customer_email,
            order_id=instance.pk,
            status=instance.status
        )

    if result["status"] == "failed":
        print(f"Error sending email: {result['error']}")
    else:
        print(f"Email sent successfully: {result['status_code']}")
