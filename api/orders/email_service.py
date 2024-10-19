from django.conf import settings
import sendgrid
from sendgrid.helpers.mail import Mail

class EmailService:
    
    def __init__(self):
        self.sg = sendgrid.SendGridAPIClient(api_key=settings.SENDGRID_API_KEY)
        self.from_email = settings.SENDGRID_FROM_EMAIL

    def send_email(self, to_email, subject, content):
        email = Mail(
            from_email=self.from_email,
            to_emails=to_email,
            subject=subject,
            plain_text_content=content,
        )
        try:
            response = self.sg.send(email)
            return {"status": "success", "status_code": response.status_code}
        except sendgrid.exceptions.SendGridException as e:
            return {"status": "failed", "error": str(e)}
        except Exception as e:
            return {"status": "failed", "error": str(e)}

    def send_order_created_email(self, to_email, order_id):
        subject = "Your order has been confirmed!"
        content = f"Dear Customer, your order (ID: {order_id}) has been confirmed."
        return self.send_email(to_email, subject, content)

    def send_order_status_updated_email(self, to_email, order_id, status):
        subject = f"Your order status has been updated to {status}"
        content = f"Dear Customer, your order (ID: {order_id}) is now {status}."
        return self.send_email(to_email, subject, content)
