import jwt
from datetime import timedelta
from django.utils import timezone
from django.conf import settings
from rest_framework.views import exception_handler
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from xhtml2pdf import pisa
from io import BytesIO

    
def link_callback(uri, rel):
    if uri.startswith('/static/'):
        return os.path.join(settings.STATIC_ROOT, uri.replace('/static/', ''))
    return uri

def generate_invoice_pdf(context):
    try:
        html = render_to_string("bill/invoice.html", context)
        pdf_buffer = BytesIO()
        
        pdf_status = pisa.CreatePDF(
            html,
            dest=pdf_buffer,
            encoding='UTF-8',
            link_callback=link_callback
        )
        
        if pdf_status.err:
            print(f"PDF generation error: {pdf_status.err}")
            return None
            
        pdf_buffer.seek(0)
        return pdf_buffer.getvalue()
        
    except Exception as e:
        print(f"Error generating PDF: {str(e)}")
        return None
    


    