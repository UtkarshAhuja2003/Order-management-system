from django.db import models
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError

class Order(models.Model):
    ORDER_STATUS_CHOICES = [
        ('CONFIRMED', 'Confirmed'),
        ('REJECTED', 'Rejected'),
        ('PREPARING', 'Preparing'),
        ('READY', 'Ready'),
    ]
    
    customer_email = models.EmailField(
        max_length=255, 
        validators=[EmailValidator(message="Enter a valid email address")],
        help_text="Customer's email address for order notifications",
    )
    status = models.CharField(
        max_length=10, 
        choices=ORDER_STATUS_CHOICES,
        default='CONFIRMED',
        help_text="Order status (Confirmed, Rejected, Preparing, Ready)"
    )
    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the order was created")
    updated_at = models.DateTimeField(auto_now=True, help_text="Timestamp when the order was last updated")
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'created_at']),
        ]
        verbose_name = "Order"
        verbose_name_plural = "Orders"
    
    def __str__(self):
        return f"Order {self.pk} - {self.status}"

    def clean(self):
        if self.status not in dict(self.ORDER_STATUS_CHOICES):
            raise ValidationError(f"Invalid order status: {self.status}")
