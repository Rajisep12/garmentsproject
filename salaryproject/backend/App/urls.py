from django.urls import path, include
#from rest_framework.routers import DefaultRouter
from App.custom_views import admin,admin_methods

urlpatterns = [
    
    # Admin Login and User Management
    path('admin/login/', admin.admin_login, name='admin_login'),
    path('admin/logout/', admin.logout_view, name='admin-logout'),

    # Employee
    path('admin/employee/', admin_methods.employee_list_create, name='employee-list-create'),
    path('admin/employee/<int:pk>/', admin_methods.employee_update_delete, name='employee-update-delete'),

    # Customer
    path('admin/customer/', admin_methods.customer_list_create, name='customer-list-create'),
    path('admin/customer/<int:pk>/', admin_methods.customer_update_delete, name='customer-update-delete'),
    
    # Tax
    path('admin/tax/', admin_methods.tax_list_create, name='tax-list-create'),
    path('admin/tax/<int:pk>/', admin_methods.tax_update_delete, name='tax-update-delete'),
    
    # Order
    path('admin/order/', admin_methods.order_list_create, name='order-list-create'),
    #path('admin/order/<int:pk>/', admin_methods.customer_update_delete, name='customer-update-delete'),

    # Bill
    path('admin/bill/', admin_methods.bill_list_create, name='bill-list-create'),
    path('admin/bill/<int:pk>/', admin_methods.bill_update_delete, name='bill-update-delete'),
    
    # Bill last invoice
    path('admin/bill/last_invoice/', admin_methods.get_last_invoice, name='last-invoice'),

    path('admin/generate-invoice/<int:invoice_id>/', admin_methods.generate_invoice_pdf, name='generate-invoice'),
    
    # # User
    # path('admin/user/', admin_methods.get_users, name='user-list'),


    
]