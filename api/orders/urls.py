from django.urls import path
from . import views

urlpatterns = [
    path('', views.order_list_create, name='order-list-create'),
    path('<int:pk>/', views.order_detail, name='order-detail'),
]
