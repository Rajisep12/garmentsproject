from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import RegexValidator
from datetime import timedelta
from django.db.models import Sum, F, DecimalField
from django.utils.timezone import now
from decimal import Decimal

class TblUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email,password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email,password, **extra_fields)

class TblUser(AbstractBaseUser, PermissionsMixin):
    email         = models.EmailField(unique=True)
    full_name    = models.CharField(max_length=100)
    password      = models.CharField(max_length=128)
    phone_number  = models.CharField(max_length=15, unique=True,blank=True,null=True)
    isdeveloper   = models.BooleanField(default=False)
    picture = models.ImageField(upload_to='user_pictures/', null=True, blank=True)

    # Required fields for authentication
    is_active = models.BooleanField(default=True)
    is_staff  = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    objects = TblUserManager()

    USERNAME_FIELD = "email"

    class Meta:
        db_table  = "app_tbluser"
        
    def __str__(self):
        return f"{self.full_name} ({self.email})"


class TblEmployee(models.Model):
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=100,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)  
    deleted_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'app_tblemployee'
       
    def __str__(self):
        return self.name

class TblCustomer(models.Model):
    name = models.CharField(max_length=100)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    mobile = models.CharField(max_length=10,null=True)
    gst = models.CharField(max_length=100,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)  
    deleted_at = models.DateTimeField(auto_now_add=True)
    cgst = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=0)
    sgst = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=0)
    igst = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=0)
    
    class Meta:
        db_table = 'app_tblcustomer'
       
    def __str__(self):
        return self.name

class TblTax(models.Model):
    name = models.CharField(max_length=100)
    cgst = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True)
    sgst = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)  
    deleted_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'app_tbltax'
       
    def __str__(self):
        return self.name



class TblOrder(models.Model):
    order_date = models.DateField(null=True, blank=True)
    dc_number = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True)
    total_qty = models.IntegerField(default=0) 
    company_name = models.ForeignKey(TblCustomer, on_delete=models.CASCADE,null=True, blank=True,related_name='TblOrder_customer')
    shortage = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)  
    deleted_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'app_tblorder'
       
    def __str__(self):
        return self.dc_number


class TblBill(models.Model):
    customer = models.ForeignKey(TblCustomer, on_delete=models.CASCADE,null=True, blank=True,related_name='TblBill_customer')
    invoice_no = models.CharField(max_length=100)
    invoice_date = models.DateField(null=True, blank=True)
    reverse_charge = models.BooleanField(default=False)  
    transport_mode = models.CharField(max_length=100,null=True, blank=True)
    transport_vehicle = models.CharField(max_length=100,null=True, blank=True)
    supply_date = models.DateField(null=True, blank=True)
    tax = models.ForeignKey(TblTax, on_delete=models.CASCADE,null=True, blank=True,related_name='TblBill_tax')
    place = models.CharField(max_length=100)
    cgst_amt = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False, default=0)
    sgst_amt = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False, default=0)
    igst_amt = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False, default=0)    
    cgst = models.DecimalField(max_digits=5, decimal_places=2, null=False, blank=False, default=0)
    sgst = models.DecimalField(max_digits=5, decimal_places=2, null=False, blank=False, default=0)
    igst = models.DecimalField(max_digits=5, decimal_places=2, null=False, blank=False, default=0)
    total_amt = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True)    
    total_gst = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True)    
    pdf_file = models.FileField(upload_to='invoices/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)  
    deleted_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'app_tblbill'
       
    def __str__(self):
        return self.invoice_no

class TblBillitems(models.Model):
    bill = models.ForeignKey(TblBill, on_delete=models.CASCADE,null=True, blank=True,related_name='TblBillitems_bill')
    product = models.CharField(max_length=100)
    hsn = models.CharField(max_length=10,null=True, blank=True)
    rate = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True)   
    qty = models.IntegerField(default=0)
    amt = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True) 
    discount = models.DecimalField(max_digits=10, decimal_places=2,default=Decimal('0.00'))       
    total_amt = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True)    
    
    class Meta:
        db_table = 'app_tblbillitems'
       
    def __str__(self):
        return self.product or f"Bill Item #{self.id or 'new'}"